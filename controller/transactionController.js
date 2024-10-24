const Transaction = require("../model/transactionSchema");
const asyncHandler = require('express-async-handler');

const {Error} = require('mongoose');


const transactionController = {
    

    addTransaction : asyncHandler(async(req,res)=>{

        const {amount,category,description,transactionType} = req.body
        
    
        if(!amount || !category || !description || !transactionType )
            throw new Error("Data is incomplete")

       const createdTransaction = await Transaction.create({

             amount,
             category,
             description,
           transactionType,
        
             
      })


    if(!createdTransaction)
        throw new Error("Transaction is not created")
       
       
       res.send("Transaction added successfully")
    
}),

 updateTransaction : asyncHandler(async(req,res)=>{

    const {newAmount,newCategory,newTransactionType,newDescription} =  req.body
    const {id} = req.params
   
    
    const changedAmount= await Transaction.findOneAndUpdate({id},{$set:{amount:newAmount}})

    const changedCategory = await Transaction.findOneAndUpdate({id},{$set:{category:newCategory}})

   const changedTransactionType = await Transaction.findOneAndUpdate({id},{$set:{transactionType:newTransactionType}})

   const changedDescription = await Transaction.findOneAndUpdate({id},{$set:{description:newDescription}})
    
}),

getTransaction : asyncHandler(async(req,res)=>{

    const {id} = req.params
    if(!id)
        throw new Error("Data incomplete")

    const data = await Transaction.findOne({id})
   
res.send(data)
    // res.send(data)
}),

deleteTransaction : asyncHandler(async(req,res)=>{

    const {id} = req.body

    if(!id)
        throw new Error("Data incomplete")

    const deletedData = await Transaction.findOneAndDelete({id})

    res.send("Successfully deleted")

})
}

module.exports = transactionController

