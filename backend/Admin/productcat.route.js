const express = require('express');
const productCatRouter = express.Router();
const ProductCat = require('../Admin/productcat.model');

productCatRouter.post('/save', (req, res) => {

    const productCat = new ProductCat(req.body);
    productCat.save().then(result => {
        res.send('productCat saved successfully');
    }).catch(err => {
        res.send(err);
    })
});
productCatRouter.get('/getall', (req, res) => {
    ProductCat.find().then(result => {
        res.send(result);
    }).catch(err => {
        res.send(err);
    })
})
module.exports = productCatRouter;
