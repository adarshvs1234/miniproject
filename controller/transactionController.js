const Transaction = require("../model/transactionSchema");
const asyncHandler = require('express-async-handler');

const {Error} = require('mongoose');
const User = require("../model/userSchema");

const transactionController = {
    

    addTransaction : asyncHandler(async(req,res)=>{

        const {num,amount,category,description,transactionType} = req.body
        if(!amount || !category || !description || !transactionType || !num)
            throw new Error("Data is incomplete")

    
        //     const  user = await User.find({userId})
    //     if(!user)
    //         throw new Error("The user doesn't exist")

       const createdTransaction = await Transaction.create({

             amount,
             category,
             description,
           transactionType,
           num
       })
       
       
       if(!createdTransaction)
        throw new Error("Transaction is not created")
       
       res.send("Transaction added successfully")
    
}),
 updateTransaction : asyncHandler(async(req,res)=>{

    const {num,newAmount,newCategory,newTransactionType,newDescription} =  req.body
    if(!num)
        throw new Error("Data incomplete")

   const changedAmount= await Transaction.findOneAndUpdate({num},{$set:{amount:newAmount}})
   const changedCategory = await Transaction.findOneAndUpdate({num},{$set:{category:newCategory}})
   const changedTransactionType = await Transaction.findOneAndUpdate({num},{$set:{transactionType:newTransactionType}})
   const changedDescription = await Transaction.findOneAndUpdate({num},{$set:{description:newDescription}})
    
}),

getTransaction : asyncHandler(async(req,res)=>{

    const {num} = req.body
    if(!num)
        throw new Error("Data incomplete")
    const data = await Transaction.findOne({num})
   
res.send(data)
    // res.send(data)
})

delete
}


module.exports = transactionController

