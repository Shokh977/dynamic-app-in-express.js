const path = require('path');

const express = require('express');

const adminData = require('./admin')
const rootDir = require('../util/path');

const router = express.Router();

router.get('/', (req, res, next) => {
  const products = adminData.products
 res.render('shop', 
  {
   prods : products,
   pageTitle: 'shop page',
   path:'/',
   hasProducts : products.length > 0,
   activeShop:true,
   productCSS : true,
    }) 
});

module.exports = router;
