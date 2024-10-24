const Transaction = require("../model/transactionSchema");
const asyncHandler = require('express-async-handler');
const User = require("../model/userSchema");

const transactionController = {
    

    addTransaction: asyncHandler(async(req,res)=>{

        const {amount,category,description,transactionType,userId} = req.body
        if(!amount || !category || !description || !transactionType || !userId)
            res.send("Data incomplete")

        const  user = await User.find({userId})
        if(!user)
            throw new Error("The user doesn't exist")

        const createdTransaction = await Transaction.create({
            Amount : amount,
            Category : category,
            Description : description,
            Transaction_Type : transactionType  
    })
    if(!createdTransaction)
          throw new Error("User is not created")
    
    const payload ={
        id:createdTransaction._id,
        amount:createdTransaction.Amount
    }
})
}

    // getTransaction : asyncHandler(async(req,res)=>{

    // })

module.exports = transactionController