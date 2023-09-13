const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

const bannerSchema  = mongoose.Schema({
    name:{type: String, required:true},
    title:{type: String, required:true},
    subtitle:{type: String, required:true},
    image:{type: String, required:true},
  

})

const bannerModel = mongoose.model('bannerModel', bannerSchema);

module.exports = bannerModel;