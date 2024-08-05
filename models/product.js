// just empty array to store products
const products = []

// this is a class-based module
module.exports = class Product {
  // here is the t inside of the constructor is an argument coming from where this Product Class is used
  constructor(t){
     this.title = t
  }
  // save is a method to get the argument and store it to the empty array above
  save(){
    products.push(this)
  }

  // this just returns the array
  static fetchAll(){
    return products
  }
}