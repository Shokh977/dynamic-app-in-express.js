const { where } = require("sequelize");
const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  req.user
    .createProduct({
      title: title,
      price: price,
      imageUrl: imageUrl,
      description: description,
    })
    .then(res.redirect("/products"))
    .catch((err) => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  req.user
    .getProducts({ where: { id: prodId } }) // this is get specific product belongs to the user model (authenticated user)
    // Product.findByPk(prodId)            // this line of code just get any single product matches the id
    .then((products) => {
      const product = products[0];
      if (!products) {
        console.log(products, "products : ");
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
      });
    })
    .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
  Product.findByPk(prodId)
    .then((product) => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDescription;
      product.imageUrl = updatedImageUrl;
      // in sequelize there is a method called save() to store the data to the database
      // here we are not changing the data in the database. it first do it locally and update the database
      return product.save();
    })
    .then(res.redirect("/admin/products"))
    .catch((err) => console.log(err));
};

// admin products

exports.getAdminProducts = (req, res, next) => {
  req.user.getProducts().then((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "admin products",
      path: "/admin/products",
    });
  });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
    .then((product) => {
      return product.destroy();
    })
    .then((result) => {
      console.log(result, ": destroyed PRODUCT");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};
