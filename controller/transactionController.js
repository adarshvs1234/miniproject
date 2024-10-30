const Transaction = require("../model/transactionSchema");
const asyncHandler = require('express-async-handler');
const Category = require("../model/categorySchema");
const {Error} = require('mongoose');
const { findById } = require("../model/userSchema");




const transactionController = {
    

    addTransaction : asyncHandler(async(req,res)=>{

        const {amount,category,description,transactionType} = req.body
       
       
        if(!amount || !category || !description || !transactionType )
            throw new Error("Data is incomplete")


        let categoryCreated = await Category.exists({category})
       //console.log(categoryCreated);
        
        if(!categoryCreated){
    
                 categoryCreated = await Category.create({
                    category,
                    transactionType
                 })
                    if(!categoryCreated){
                    throw new Error("Category not created")
            }
            console.log(categoryCreated);
            
            
        }

        
   const createdTransaction = await Transaction.create({

        amount,
        category,   //:categoryCreated._id,
        description,
        transactionType
       
   })

   if(!createdTransaction){
    throw new Error("Transaction is not created")
   }
    res.send(createdTransaction)

}),  




 updateTransaction : asyncHandler(async(req,res)=>{

    const {newAmount,newCategory,newTransactionType,newDescription} =  req.body
    const {id} = req.user

    
if(!id)
        throw new Error("Incomplete data")

   
    
    const changedAmount= await Transaction.findByIdAndUpdate(id,{amount:newAmount})

    const changedCategory = await Transaction.findByIdAndUpdate(id,{category:newCategory})

   const changedTransactionType = await Transaction.findByIdAndUpdate(id,{transactionType:newTransactionType})

   const changedDescription = await Transaction.findByIdAndUpdate(id,{description:newDescription})

   if(changedAmount || changedCategory || changedTransactionType || changedDescription)
        res.send("Successfully updated")
    
   else
    throw new Error("Data incomplete")
    
}),

getTransaction : asyncHandler(async(req,res)=>{

   
   const allTransactionData = await Transaction.find()
    res.send(allTransactionData)

    
const data = await Transaction.findById(id)

    console.log(data)
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

