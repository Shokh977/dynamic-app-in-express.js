const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "add product",
    path: "/admin/add-product",
    formCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imgUrl = req.body.imgUrl;
  const price = req.body.price;
  const desc = req.body.desc;
  const product = new Product(title, imgUrl, price, desc);
  product.save();
  res.redirect("/");
};

// admin products

exports.getAdminProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "admin products",
      path: "/admin/products",
    });
  });
};
