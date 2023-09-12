const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

const productSchema  = mongoose.Schema({
    catogery:{type: String, required:true},
    image:[{type: String, required:true}],
    productname:{type: String, required:true},
    description:{type: String, required:true},
    price:{type: Number, required:true},
    offerprice:{type: Number, required:true},

})

const productModel = mongoose.model('productModel', productSchema);

module.exports = productModel;