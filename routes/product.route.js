const express = require("express");
const ProductModel = require("../models/product.model");
const isAuthenticated = require("../middleware/isAuthenticated");

const productRouter = express.Router();



productRouter.get("/", async(req,res)=>{

  try {
    const product = await ProductModel.find(req.body)
    res.status(201).json({product})
  } catch (error) {
    res.status(500).json({msg:"Internal server error",error})
  }

})



productRouter.post("/create",isAuthenticated, async (req,res)=>{

  try {
    const newproduct = new ProductModel(req.body)
    await newproduct.save()
    res.status(200).json({msg:"Product created Successfully!"})
} catch(error) {
    res.status(500).json({msg:"Internal server error", error})
}

})


productRouter.put("/:productId",isAuthenticated, async (req,res)=>{
  const {productId} = req.params
  try{
      const product = await ProductModel.findOne({_id:productId})
      if(product.userId.toString() === req.body.userId) { 
          await ProductModel.findByIdAndUpdate({_id: productId}, req.body)
          res.status(200).json({msg:`The Product with ID: ${productId} has been updated`})
      } else {
          res.status(400).json({msg:"You are not authorised to perform this task!"})
      }
  }catch(error){
      res.status(500).json({error})
  }  
})

productRouter.delete("/:productId",isAuthenticated, async(req,res)=>{
  const {productId} = req.params
  try{
      const product = await ProductModel.findOne({_id:productId})
      if(product.userId.toString() === req.body.userId) { 
          await ProductModel.findByIdAndDelete({_id: productId})
          res.status(200).json({msg:`The note with ID: ${productId} has been deleted`})
      } else {
          res.status(400).json({msg:"You are not authorised to perform this task!"})
      }
  }catch(error){
      res.status(500).json({error})
  }  
})

module.exports = productRouter;


