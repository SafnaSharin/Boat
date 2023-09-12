var express = require('express');
const adminModel = require('../models/adminModel');
var asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createAdmin = async (req, res) => {
    const datas = {
        username: "safnasharin",
        email: "safnasharin17@gmail.com",
        contact: 7510797406,
        password: "safna123", // Plain text password
    };

    try {
        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(datas.password, 10);
        datas.password = hashedPassword;

        const adminlogin = await adminModel.insertMany(datas);
        res.json({ adminlogin });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: "an error occurred" });
    }
};

exports.adminFind = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await adminModel.findOne({ email: email });

    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordMatch = await bcrypt.compare(password, admin.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ email: admin.email }, 'your-secret-key');
    return res.status(200).json({ token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'An error occurred' });
  }
};

  exports.adminUser=asyncHandler(async (req, res)=>{
    try{
        const admins = await adminModel.find();
        res.json(admins);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'an error occuired'});
    }
  });

  exports.signingup = asyncHandler(async (req, res) => {
    
    try {
      const { username, email, password ,contact,location,role} = req.body;
      const images = req.file.filename;
      console.log(username);
      console.log('add aayi');
      console.log(images);
        // const hashedPassword = await bcrypt.hash(password, 10);
       
      const signup = await adminModel.create({
        username: username,
        email: email,
        password: password,
        image:images,
        location:location,
        role:role,
        contact: contact,
      });
      console.log(signup);
      console.log(username);
      res.status(201).json({ message: "signed up" }); // Corrected response message
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "an error occurred" }); // Corrected response message
    }
  });
  
exports.editdetails= asyncHandler(async(req,res)=>{
    const{id}=req.params;
    console.log(id)
    try{
        const details=await adminModel.findById(id);
        if(!details){
            return res.status(404).json({error:'not found'});
        }
        res.json(details);
    }
    catch(error){
        console.error(error);
        res.status(500).json({error:'an error occurred'})
    }
});
exports.update = asyncHandler(async(req, res) =>{
    const{id}=req.params;
    const{ username, email, contact, password, role, location}=req.body;

    try{
        const details = await adminModel.findById(id);
        if(!details){
            return res.status(404).json({error:'not found details'});
        }
        details.username = username;
        details.email = email;
        details.contact = contact;
        details.password = password;
        details.role = role;
        details.location = location;
      if(req.file){
      details.image=req.file.filename
     }        

        const updatedetails=await details.save();
         
        res.json(updatedetails);
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:'error occuired'});
    }
});
exports.deleteuser = asyncHandler(async (req, res) => {
    const {id} =req.params;
    try {
      const deleteuser = await adminModel.findById(id);
      if (!deleteuser) {
        return res.status(404).json({ error: 'user not found' });
      }
      await deleteuser.deleteOne();
      res.json({ message: 'user deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while deleting the user' });
    }
  });

  // adminprofile.js
  exports.getadminprofile = asyncHandler(async (req, res) => {
    
    const adminUsername = req.user.email; // Assuming you have the authenticated user's username stored in req.user
    try {
      const adminprofile = await adminModel.findOne({ email: adminUsername });
      if (adminprofile) {
        // console.log(adminprofile);
        res.json(adminprofile);
      } else {
        res.status(404).json({ error: 'Admin profile not found' });
      }
    } catch (err) {
      res.status(500).json({ err: 'internal server error' });
    }
  });
  
  exports.updateProfile = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { username, email, contact, role, location } = req.body;
    console.log(id);
    try {
      console.log('Received update request with data:', req.body); 
      const user = await adminModel.findById(id);
  
      // Check if the user is authenticated
      if (!user) {
        return res.status(401).json({ error: 'Unauthorizeddddddd' });
      }
  
      // Update the user's profile with the provided information
      user.username = username;
      user.email = email;
      user.contact = contact;
      user.role = role;
      user.location = location;
  
      const updatedUser = await user.save();
  
      res.json(updatedUser);
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  exports.adminLogout = asyncHandler(async (req, res) => {
    const token = req.headers.authorization;
    if(token){
      try{
      const admin = await adminModel.findOne({tokens:token});
      if(admin && admin.tokens){
        admin.token = '';
        await admin.save();
      }
    } catch(error){
console.error('Error while updating token:', error)
    }
  }
  res.json({messege:'Logout successfully'})
})

exports.changePassword = asyncHandler(async(req,res)=>{
  const userId=req.params.id;
  console.log(userId);
  const{oldpassword,newpassword}=req.body;
  try{
    const adminchangepassword = await adminModel.findById(userId);
    const passwordMatch =await bcrypt.compare(oldpassword,adminchangepassword.password)
    if(!passwordMatch){
      return res.status(401).json({message:'admin not found'});
    }
    adminchangepassword.password = newpassword;
    const updateAdmin = await adminchangepassword.save();
    res.json(updateAdmin);
  }
  catch (err){
    console.log(err);
    res.status(500).json({message:'an error occurred'})
  }
});