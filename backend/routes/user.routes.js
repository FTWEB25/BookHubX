const express=require("express")
const UserModel = require("../model/user.model")
const bcrypt=require("bcrypt")
const jwt = require('jsonwebtoken');

const userRouter=express.Router()

userRouter.post("/signup",async(req,res)=>{
    const {name ,email, password,role}=req.body
    try {
        const user= await UserModel.findOne({email:email})
        if(user){
            res.status(200).json({msg:"User Already Exist!!"})
        }else{
            bcrypt.hash(password, 3, async(err, hash)=>{
                // Store hash in your password DB.
                if(err){
                    res.status(400).json({error:err.message})
                }else{
                    const newUser= new UserModel({name,email,password:hash,role})
                    await newUser.save()
                    res.status(200).json({msg:"User Added Successfully!!"})
                }
            });
        }
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})


userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try {
        const user=await UserModel.findOne({email:email})
        if(!user){
            res.status(200).json({msg:"please signup first"})
        }else{
            bcrypt.compare(password, user.password, async(err, result)=>{
                if(result){
                    const token = jwt.sign({ userId:user._id }, 'shhhhh');
                    res.status(200).json({msg:"Login Successfull",token:token})
                }else{
                    res.status(200).json({msg:"Please check your Password"})
                }
            });
        }
    } catch (error) {
        res.status(400).json({error:error.message}) 
    }
})

module.exports=userRouter