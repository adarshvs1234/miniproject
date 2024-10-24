const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    
    userName:{
        type:String,
        required:[true,"Name is required"]
    },
    emailId:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
        
    },

    password:{
        type:String,
        required:[true,"Password is required"],
       },
    
    // Timestamp:true

},{
    timestamps:true
}

)   
const User = mongoose.model('User',userSchema)

module.exports = User