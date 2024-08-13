const fs = require("fs");
const path = require("path");

//defining folder path and creating file in it.
const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);
///////////////////////////////////////////////

// helper function to reuse it to make the code leaner.
const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

// this is a class-based module

module.exports = class Product {
  constructor(title, imageUrl, price, description) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  // getting and storing data
  save() {
    this.id = Math.random().toString();
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }
  // returning data to make the data available in other component like procucts.js file on controller.
  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
  // cb callback function executed after finding id
  static findById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === id);
      cb(product);
    });
  }
};
