var express = require("express");
var router = express.Router();
var controller = require("../controller/adminController.js");
var Model = require("../models/adminModel.js");
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

router.get('/',controller.createAdmin)
router.post('/adminFind',controller.adminFind)
router.post('/sign-up',upload.single('image'),controller.signingup)
router.use(isAuthenticated);

router.get('/adminUsers',controller.adminUser)
// router.post('/sign-up',upload.single('image'),controller.signingup)
router.get('/editdetails/:id',controller.editdetails)
router.put('/update/:id',upload.single('image'),controller.update)
router.delete('/delete/:id',controller.deleteuser)
router.get('/profile',controller.getadminprofile)
router.put('/updated/:id',controller.updateProfile)
router.post('/logout',controller.adminLogout)
router.post('/changePassword/:id',controller.changePassword)

module.exports = router;
 