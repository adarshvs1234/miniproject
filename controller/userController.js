const User = require("../model/userSchema")
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const bcrypt = require('bcryptjs');
const {Error}  = require("mongoose");
const { findOne, findById } = require("../model/transactionSchema");

// const password = require("password")



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
        
        // console.log(hashedPassword);
        
    
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
        res.cookie('token',token,{
            maxAge:3*24*60*60*1000,
            httpOnly:true,
            secure:false,
            sameSite:'none'
        })
        
        res.send(token)
    }),
    signIn :asyncHandler(async(req,res)=>{
       
        const {email,password} = req.body //SignPasswordandemail

        const userFound = await User.findOne({emailId:email}) //signInemail check

        if(!userFound){
            throw new Error("Email Incorrect")
        }

        const dbPassword = userFound.password //hashedPassword from db

        const signInHashedPassword = await bcrypt.hash(password,10)//hashofSignInPassword
              
        const comparePassword = await bcrypt.compare(password,dbPassword)
           
            
       
        if(!comparePassword)
                throw new Error("Password Incorrect")
            
    
        // const isAuthenticated = nhost.auth.Authenticated() //authenticationofsignIn
        // if(isAuthenticated){
        //     console.log("User is signed in")
        // }

        const payload = {
            id:userFound._id,
            name:userFound.userName
        } 
        const token = jwt.sign(payload,process.env.JWT_SECRET_KEY)
        res.cookie('token',token,{
            maxAge:3*24*60*60*1000,
            httpOnly:true,
            secure:false,
            sameSite:'none',
     })

    if(comparePassword)
        res.send("Successfully Signed in")
                  
        
     }),

    logout: asyncHandler(async(req,res)=>{
      res.clearCookie("token")
    // res.send("Cookie is deleted successfully")
    res.send("Logout successfully")
      }),

    changePassword : asyncHandler(async(req,res)=>{

        const {newPassword} = req.body  

        const {id} = req.user;

    //    console.log(id);

      const newHashedPassword = await bcrypt.hash(newPassword,10)
     
     
      const data = await User.findById(id)
    
      
      const hashedPassword = data.password
    

      const comparePassword = await bcrypt.compare(newHashedPassword,hashedPassword)

      if(comparePassword)
          throw new Error("Password is same as previous")

        
        const changePassword = await User.findByIdAndUpdate(id,{$set:{password:newHashedPassword}},{

                 runValidators:true,
       new:true

        })
   
     
     if(!changePassword)
         throw new Error("Password not changed")

    res.send("Password changed successfully")
        
}),

 changeName : asyncHandler(async(req,res)=>{

    const {newName} = req.body
   const emailCheck =await User.findOne({emailId})
   if(!emailCheck){
       throw new Error("Email doesn't exist")
   }
        
    const nameChange =  await User.findOneAndUpdate({emailId:email},{$set:{userName:newName}},{new:true})
    console.log(nameChange)
    if(!nameChange){
       throw new Error("Name unchanged")
        
    }
    res.send("Name is successfully changed")
   
 })

}


//relationschemadb
                                                                                                                                                                                                                                                                                                                                                                           
module.exports = userController

