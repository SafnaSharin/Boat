var express = require("express");
var router = express.Router();
var controller = require("../controller/productController");
var Model = require("../models/productModel");
const bcrypt = require('bcrypt');
const isAuthenticated = require('../middleware/authmiddleware.js')
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  
  var upload = multer({ storage: storage });
 router.post('/addCatogery',upload.single('image'),controller.addCatogery)
 router.get('/catogerydisplay',controller.catogerylist)
 router.get('/editcatogery/:id',controller.editcatogery)
 router.put('/updating/:id',upload.single('image'),controller.updatecatogery)
  router.delete('/delete/:id',controller.deletecatogery)

//  --product--
router.post('/addproduct', upload.array('image'), controller.addproduct);
router.get('/productlist',controller.productlist)
router.get('/editproduct/:id',controller.editproduct)
router.put('/update/:id', upload.array('image'),controller.updateproduct)
router.delete('/deleteproduct/:id',controller.deleteproduct)
router.delete('/deleteimage/:id/:index',controller.deleteimage)
module.exports = router;