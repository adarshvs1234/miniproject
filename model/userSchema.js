const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    userId:{
        type:Number
    },
    userName:{
        type:String
    },
    emailId:{
        type:String
    },
    number:{
        type:Number
    },
    address:{
        type:String
    },
    password:{
        type:String,
        required:true,
        min:[6,"Password is too short!!"]
    }
})
const User = mongoose.model('User',userSchema)
module.exports = User