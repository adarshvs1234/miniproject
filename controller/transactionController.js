const Transaction = require("../model/transactionSchema");
const asyncHandler = require('express-async-handler');
const Category = require("../model/categorySchema");
const {Error} = require('mongoose');
const { findById, findByIdAndUpdate } = require("../model/userSchema");
const User = require("../model/userSchema");
const userController = require("./userController");


const transactionController = {
    

    addTransaction : asyncHandler(async(req,res)=>{
        const {id} = req.user
    
        const {amount,category,description,transactionType} = req.body
       
        if(!amount || !category || !description || !transactionType )
            throw new Error("Data is incomplete")

        let categoryCreated = await  Category.findOne({category})

        if(!categoryCreated){
                 categoryCreated = await Category.create({
                    category,
                    transactionType,
                    user:id  
        })
    }

    //console.log(categoryCreated);
    

  
    const createdTransaction = await Transaction.create({

        amount,
        category:categoryCreated._id,
        description,
        transactionType,
        user:id


    })
   if(!createdTransaction){
    throw new Error("Transaction is not created")
   }
  

  const userUpdate = await User.findByIdAndUpdate(id,{transaction : createdTransaction._id},

   {
        new : true,
       runValidators:true
     })                                         //transaction inserted to the db


     //const userCategoryupdate = await  User.findByIdAndUpdate(id,{category:categoryCreated._id })

    
  
     console.log(userUpdate);
     
res.send("Transaction successfully updated")
   
}),  




 updateTransaction : asyncHandler(async(req,res)=>{

    const {newAmount,newCategory,newTransactionType,newDescription} =  req.body
    const {id} = req.user
   // console.log(id);
    
    
if(!id)
        throw new Error("Incomplete data")

   
    
    const updated = await Transaction.findByIdAndUpdate(id,
    
        {
            amount:newAmount,
            category:newCategory,
            transactionType:newTransactionType,
            description:newDescription

        },{
        
        new : true,
        runValidators : true
 })

   

 
if(updated)
        res.send("Successfully updated")
    
   else
    throw new Error("Data incomplete")
    
}),

getTransaction : asyncHandler(async(req,res)=>{

   
   const allTransactionData = await Transaction.find()
    res.send(allTransactionData)

    

}),


deleteTransaction : asyncHandler(async(req,res)=>{


    const deletedData = await Transaction.deleteTransaction
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


deleteCategory : asyncHandler(async(req,res)=>{

    const {category} = req.body
    if(!category)
        throw new Error("Data incomplete")

const findData =  await Transaction.find({category})
console.log(findData);


if(findData)
    res.send("Category successfully deleted")

}),

getCategoryExpense: asyncHandler(async(req,res)=>{

    const {category} = req.body
    if(!category)
        throw new Error("Incomplete data")

    const getTransaction = await Transaction.find({category})
    // console.log(getTransaction);
    
    
    const categoryExpense = getTransaction.reduce((acc,element)=>{
        acc = element.amount +acc
        return(acc)
        
    },0)
    console.log(categoryExpense);
    res.json({
        expense:categoryExpense
    })

}),

categoryTransaction : asyncHandler(async(req,res)=>{

const {transactionType} = req.body 
const categoryData =  await Category.find({transactionType})
console.log(categoryData);


const  categories = categoryData.map(element => {
    return element.category
})

console.log(categories);

 //const categories =  data.category


// const transactionCategory = data.reduce((acc,element)=>{
//     acc = element.amount +acc
//     return(acc)
    
// },0)


res.json({
    category:categories
})





})

}

module.exports = transactionController

