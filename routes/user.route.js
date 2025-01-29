const express = require("express");
const bcrypt  = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");



const userRouter = express.Router();


userRouter.post("/", async (req,res)=>{

  try {
    const {name,email,password} = req.body;
    
    const hashPassword = await bcrypt.hash(password , Number(process.env.SALT_ROUNDS))
    const newUser = new UserModel({name ,email ,password:hashPassword});
    const savedUser = await newUser.save();
    res.status(201).json({message: "SignUp successfully . . . .", savedUser })
  } catch (error) {
    res.status(400).json({msg:error})
  }
   
});

userRouter.post("/login", async (req,res)=>{


  try {
    const {email,password} = req.body;
    const user = await UserModel.findOne({email});
    if(!user){
     return res.status(400).json({msg:"User not found"})
    }

    const matchPassword = await  bcrypt.compare(password,user.password);
   
    if(!matchPassword){
     return res.status(400).json({msg:"Password is worng"});
    }
   
    const token = jwt.sign({userId:user.id , name:user.name}, process.env.SECRET_KEY)
   
    res.status(200).json({msg:"Login successfully",token})
    
  } catch (error) {
    res.status(500).json(error.message);
  }

})





module.exports = userRouter;