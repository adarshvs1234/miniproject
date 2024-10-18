const User = require("../model/userSchema")
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const bcrypt = require('bcryptjs');
const {Error}  = require("mongoose");


const userController = {
    register : asyncHandler(async (req,res) => {
        const {name,email,password} = req.body
        if(!name||!email||!password){
            throw new Error("Data is incomplete")
        }
        const userFound = await User.findOne({emailId:email})
        if(userFound){
            throw new Error("Email already taken")
        }
        const hashedPassword = await bcrypt.hash(password,10)
        
        console.log(hashedPassword);
        
    
        const createdUser = await User.create({
            userName:name,
            emailId:email,
            password:hashedPassword
        })

        if(!createdUser){
            throw new Error("User is not Created")
        }
        const payload = {
            id:createdUser._id,
            name:createdUser.userName
        }
        const token = jwt.sign(payload,process.env.JWT_SECRET_KEY)
        res.cookie('token',token{
            maxAge:3*24*60*60*1000,
            httpOnly:true,
            secure:false,
            sameSite:'none'
        })
        res.send(token)
    });
    signIn:asyncHandler(async(req,res)=>{
        const {email,password} = req.body
        const userFound = await User.findOne({emailId:email})
        if(!userFound){
            throw new Error("Password Incorrect")
        }
        const token = jwt.sign(payload,process.env.JWT_SECRET_KEY)
        res.cookie('token',token,{
            maxAge:3*24*60*60,
            httpOnly:true
            secure:false,
            sameSite:'none'
        })
        res.send(token)
    }),
    logout:s