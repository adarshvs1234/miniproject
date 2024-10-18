const User = require("../model/userSchema")
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const bcrypt = require('bcryptjs');



const userController = { 
    register : asyncHandler(async (req,res) => {
        const {name,email,password} = req.body

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

        res.send(createdUser)
        
    }),
    login : asyncHandler(async(req,res)=>{
    
    if(!createdUser){
        throw new Error("User is not Created")
    }}
    )
}  

  await  userController.findOne({emailId:"adarhvs@gmail.com"})                  

module.exports = userController
