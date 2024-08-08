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
  constructor(title, imgUrl, desc, price) {
    this.title = title;
    this.imgUrl = imgUrl;
    this.desc = desc;
    this.price = price;
  }

  // getting and storing data
  save() {
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
};
