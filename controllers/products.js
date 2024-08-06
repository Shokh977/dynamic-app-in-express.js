// importing module
const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("add-product", {
    pageTitle: "add product",
    path: "/admin/add-product",
    formCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

exports.postAddProduct = (req, res, next) => {
  // creating an object and passing data to the Product class as an argument
  // req.body.tile is coming from the name = "title" from input tag in the add-product.ejs
  const product = new Product(req.body.title);
  //and pushing the data got from title input to the array in the Module (Product class)
  product.save();
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  //this is a fetchAll function from Product class
  // return products array in the module
  Product.fetchAll(products => {
    res.render("shop", {
      prods: products,
      pageTitle: "shop page",
      path: "/",
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
    });
  });
};
