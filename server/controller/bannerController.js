var express = require('express');
const bannerModel = require('../models/bannerModel')
var asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.addbanner =asyncHandler(async (req,res)=>{
    try{
        const {name, title, subtitle, url}=req.body;
        const image =req.file.filename;
        console.log(req.body);
        const Add= await bannerModel.create({
            name:name,
            title:title,
            subtitle:subtitle,
            url:url,
            image:image,
        });
        console.log(Add)
        res.status(201).json({ message: "banner added" }); 
    }
    catch(error){
        console.error(error)
        res.status(500).json({ error: "an error occurred" });
    }
})
exports.bannerlist = asyncHandler(async (req,res)=>{
    try{
        const banner = await bannerModel.find();
        res.json(banner);
    }catch (error){
        console.error(error);
        res.status(500).json({error:'ann error occuired'})
    }
})

exports.editbanner= asyncHandler(async(req,res)=>{
    const {id} =req.params;
  //  console.log(id)
    console.log(req.body)
    try{
        const details=await bannerModel.findById(id);
        if(!details){
          //  return res.status(404).json({error:'not found'});
        }
        res.json(details);
    }
    catch(error){
        console.error(error);
        res.status(500).json({error:'an error occurred'})
    }
});

exports.updatebanner = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const {name, title, subtitle, url}=req.body;
    const files = req.file;

   console.log(req.body);
    try {
      console.log("hiiii");
      const details = await bannerModel.findById(id);
      if (!details) {
        return res.status(404).json({ error: "not found details" });
      }
      details.name = name;
      details.title = title;
      details.subtitle = subtitle;
      details.url = url; // Change variable name
      if (req.file) {
        details.image = req.file.filename;
        console.log( req.file.filename)
      }
  
      const updatedetails = await details.save();
  
      res.json(updatedetails);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "error occurred" });
    }
  });

  exports.deletebanner = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
      const deletedCatogery = await bannerModel.findByIdAndDelete(id);
      if (!deletedCatogery) {
        return res.status(404).json({ error: "banner not found" });
      }
      res.json({ message: "banner deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred" });
    }
  });