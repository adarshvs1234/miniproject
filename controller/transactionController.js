const Transaction = require("../model/transactionSchema");
const asyncHandler = require('express-async-handler');
const Category = require("../model/categorySchema");
const {Error} = require('mongoose');




const transactionController = {
    

    addTransaction : asyncHandler(async(req,res)=>{

        const {amount,category,description,transactionType,id} = req.body
        
    
        if(!amount || !category || !description || !transactionType )
            throw new Error("Data is incomplete")

       const createdTransaction = await Transaction.create({

             amount,
             category,
             description,
           transactionType,
            id
             
      })


    if(!createdTransaction)
        throw new Error("Transaction is not created")
       
    
    const checkCategory = await Category.exists({category})

    if(!checkCategory)
    {
        throw new Error("Category doesn't exist . Insert new category with newCategory keyword ")
    
    }
res.send("Transaction added successfully")
    
}),




 updateTransaction : asyncHandler(async(req,res)=>{

    const {newAmount,newCategory,newTransactionType,newDescription} =  req.body
    const {id} = req.params

    
if(!id)
        throw new Error("Incomplete data")

   
    
    const changedAmount= await Transaction.findOneAndUpdate({id},{$set:{amount:newAmount}})

    const changedCategory = await Transaction.findOneAndUpdate({id},{$set:{category:newCategory}})

   const changedTransactionType = await Transaction.findOneAndUpdate({id},{$set:{transactionType:newTransactionType}})

   const changedDescription = await Transaction.findOneAndUpdate({id},{$set:{description:newDescription}})
   
   res.send("Successfully updated")
    
}),

getTransaction : asyncHandler(async(req,res)=>{

    const {id} = req.params
   
    if(!id)
        throw new Error("Data incomplete")

    
const data = await Transaction.findOne({id})
    res.send(data)
}),


deleteTransaction : asyncHandler(async(req,res)=>{

    const {id} = req.params

    if(!id)
        throw new Error("Data incomplete")

    const deletedData = await Transaction.findOneAndDelete({id})

    res.send("Successfully deleted")

}),



summary : asyncHandler(async(req,res)=>{

    
const expenseTransaction = await Transaction.find({transactionType:"personalExpense"})
const incomeTransaction = await Transaction.find({transactionType:"Income"})



    if(!expenseTransaction)
        throw new Error("Transaction type doesn't exist")

    if(!incomeTransaction)
        throw new Error("Transaction type doesn't exist")


    const totalIncome = incomeTransaction.reduce((acc,element)=>{

        acc = element.amount + acc
        return(acc)
        
    },0)

    
    const totalExpense = expenseTransaction.reduce((acc,element)=>{
        acc = element.amount +acc
        return(acc)
        
    },0)

    const totalBalance = totalIncome-totalExpense
    
    res.json({
        totalIncome,
        totalExpense,
        totalBalance
    })
    
}),


addCategory : asyncHandler(async(req,res)=>{

    const {category} = req.body

    if(!category)
        throw new Error("Data is incomplete")

    const categoryCreate = await Category.create({
        category
    })

    if(!categoryCreate)
        throw new Error("Category not created")

    const categoryCheck = await Category.exists({category})

    if(categoryCheck)
        throw new Error("Category already exists")

res.send("Category successfully created")
       
}),

deleteCategory : asyncHandler(async(req,res)=>{

    const {category} = req.body
    if(!category)
        throw new Error("Data incomplete")

const findData =  await Transaction.deleteMany({category})

}),

getCategoryExpense: asyncHandler(async(req,res)=>{

    const {category} = req.body
    if(!category)
        throw new Error("Incomplete data")

    const getCategory = await Transaction.find({category})
    
    // const expenseTransaction = await getCategory



})




//  
    

 //const updateData = await Transaction.findOneAndUpdate({id})
//   console.log(updateData)



}

module.exports = transactionController

