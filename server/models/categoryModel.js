const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

const catogerySchema  = mongoose.Schema({
    catogery:{type: String, required:true},
    image:{type: String, required:true},
  

})

const categoryModel = mongoose.model('catogeryModel', catogerySchema);

module.exports = categoryModel;