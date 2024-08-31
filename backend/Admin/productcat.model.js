const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductCat = new Schema({
    pcatgid: { type: Number },
    pcatgname: { type: String }
},
    {
        collection: 'product'
    }
);

module.exports = mongoose.model('ProductCat', ProductCat);