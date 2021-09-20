var express = require('express');
var router = express.Router();
const Product = require("../models/Product")

router.get('/', function (req, res, next) {
  Product.find({}, (err, docs) => {
    if (err) {
      console.log(err)
    }
    var productGrid = []
    var colGrid = 3
    for (let i = 0; i < docs.length; i += colGrid) {
      productGrid.push(docs.slice(i, i + colGrid))
    }
    console.log(req.session)
    console.log(req.user)
    res.render('index', { title: 'Shopping cart', products: productGrid });
  })
});

module.exports = router;
