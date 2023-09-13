var express = require("express");
var router = express.Router();
var controller = require("../controller/bannerController");
var Model = require("../models/bannerModel");
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

  router.post('/addbanner', upload.single('image'), controller.addbanner);
  router.get('/bannerdisplay',controller.bannerlist)
  router.get('/editbanner/:id',controller.editbanner)
  router.put('/update/:id', upload.single('image'), controller.updatebanner);
  router.delete('/deletebanner/:id',controller.deletebanner)
  module.exports = router;