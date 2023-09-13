var express = require('express');
const productModel = require('../models/productModel');
const catogeryModel = require('../models/categoryModel')
var asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.addCatogery =asyncHandler(async (req,res)=>{
    try{
        const {catogery}=req.body;
        const image =req.file.filename;
        console.log(req.body);
        const Add= await catogeryModel.create({
            catogery:catogery,
            image:image,
        });
        console.log(Add)
        res.status(201).json({ message: "catogery added" }); 
    }
    catch(error){
        console.error(error)
        res.status(500).json({ error: "an error occurred" });
    }
})
exports.catogerylist = asyncHandler(async (req,res)=>{
    try{
        const catogery = await catogeryModel.find();
        res.json(catogery);
    }catch (error){
        console.error(error);
        res.status(500).json({error:'ann error occuired'})
    }
})
exports.editcatogery= asyncHandler(async(req,res)=>{
    const {id} =req.params;
  //  console.log(id)
    console.log(req.body)
    try{
        const details=await catogeryModel.findById(id);
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
exports.updatecatogery = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { catogery } = req.body; 
    const files = req.file;

   console.log(req.body);
    try {
      console.log("hiiii");
      const details = await catogeryModel.findById(id);
      if (!details) {
        return res.status(404).json({ error: "not found details" });
      }
      details.catogery = catogery; // Change variable name
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

  exports.deletecatogery = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
      const deletedCatogery = await catogeryModel.findByIdAndDelete(id);
      if (!deletedCatogery) {
        return res.status(404).json({ error: "Category not found" });
      }
      res.json({ message: "Category deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred" });
    }
  });

// //   ---product--

exports.addproduct =asyncHandler(async (req,res)=>{
    try{
        const {productname, description, price, offerprice, catogery}=req.body;
        const files = req.files;
        const image = files.map((file) => file.filename);
        // console.log(product);
        const Add= await productModel.create({
            productname:productname,
            description:description,
            price:price,
            catogery:catogery,
            image:image,
            offerprice:offerprice,
        });
        console.log(Add)
        res.status(201).json({ message: "catogery added" }); 
    }
    catch(error){
        console.error(error)
        res.status(500).json({ error: "an error occurred" });
    }
})
exports.productlist = asyncHandler(async (req,res)=>{
  try{
      const product = await productModel.find();
      res.json(product);
  }catch (error){
      console.error(error);
      res.status(500).json({error:'ann error occuired'})
  }
})

exports.editproduct= asyncHandler(async(req,res)=>{
  const {id} =req.params;
  console.log(id)
  console.log(req.body)
  try{
      const details=await productModel.findById(id);
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

exports.updateproduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { productname,price, offerprice, description,catogery } = req.body; 
  const files = req.files;console.log(files);
  const image = files.map((file) => file.filename);
  console.log(image);
  try {
    console.log("hiiii");
    const details = await productModel.findById(id);
    if (!details) {
      return res.status(404).json({ error: "not found details" });
    }
    details.catogery = catogery;
    details.productname = productname;
    details.price = price;
    details.offerprice= offerprice
    details.description = description;
    if (files && files.length >0) {
      details.image = [...details.image, ...image];
      console.log(image)
    }

    const updatedetails = await details.save();

    res.json(updatedetails);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "error occurred" });
  }
});

exports.deleteproduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id)
  try {
    const deletedproduct = await productModel.findByIdAndDelete(id);
    if (!deletedproduct) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

exports.deleteimage = asyncHandler(async (req, res) => {
  const { id, index } = req.params;
  console.log("Product ID:", id);
  console.log("Image Index:", index);

  try {
    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (index < 0 || index >= product.image.length) {
      return res.status(400).json({ error: "Invalid image index" });
    }

    product.image.splice(index, 1);

    await product.save();

    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});
