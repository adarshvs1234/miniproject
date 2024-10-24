const mongoose = require('mongoose')
// const user = require('./userSchema')

const transactionSchema = new mongoose.Schema({

    amount : {
        type:Number,
        required:[true,"Amount is required"],
        default:0
    },

    category:{
        type:String,
        required:[true,"Category is required"]
    },

    description:{
        type:String,
        required:[true,"Description is required"],
    
    },

    transactionType:{
        type:String,
        required:[true,"Transaction is required"]
    },

    // Timestamp: true,

userId:{

    type:mongoose.Types.ObjectId,
    ref:"User" 
}

},{
    timestamps:true
}

)  
const Transaction = mongoose.model('Transaction',transactionSchema)
// Transaction.find({}).populate("User")
module.exports =Transaction









    