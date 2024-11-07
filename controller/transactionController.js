const Transaction = require("../model/transactionSchema");
const asyncHandler = require('express-async-handler');
const Category = require("../model/categorySchema");
const {Error, default: mongoose} = require('mongoose');
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
  

  const userUpdate = await User.findByIdAndUpdate(id,{$push:{transaction : createdTransaction._id}},

   {
        new : true,
       runValidators:true
     })                                         //transaction inserted to the db
                              

     const categeoryTransactionUpdate = await Category.findByIdAndUpdate(categoryCreated._id,{$push:{transaction : createdTransaction._id}},

        {
             new : true,
            runValidators:true
          })   

     console.log(categeoryTransactionUpdate);
     
     console.log(userUpdate);
     
res.send("Transaction successfully updated")
   
}),  




 updateTransaction : asyncHandler(async(req,res)=>{

    
     const {newAmount,newCategory,newTransactionType,newDescription} =  req.body
 const {id} = req.params
  console.log(id)


  const updatedTransaction = await Transaction.findByIdAndUpdate(id,
    
        {
            amount:newAmount,
            category:newCategory,
            transactionType:newTransactionType,
            description:newDescription

        },{
        
        new : true,
        runValidators : true
 })

   console.log(updatedTransaction)

 
 if(updatedTransaction)
        res.send("Successfully updated")
    
    else
     throw new Error("Data incomplete")
    
}),

getTransaction : asyncHandler(async(req,res)=>{

   const allTransactionData = await Transaction.find()
    res.send(allTransactionData)

    

}),


deleteTransaction : asyncHandler(async(req,res)=>{   //deleteAllTransactions


    const userId = req.user.id
    
    const {id} = req.params
 
   console.log(id);
    
const transactionDelete = await Transaction.findByIdAndDelete(id);

if(!transactionDelete)
    throw new Error("Transaction doesn't exist ")
 

const userDelete = await User.findByIdAndUpdate(userId ,{ "$pull": {transaction : new mongoose.Types.ObjectId(id)}},

{
        
    new : true,
    runValidators : true
})


res.send("Transaction deleted successfully")


}),



summary : asyncHandler(async(req,res)=>{

    const userId = req.user.id 
    console.log(userId);
    
    const results = await User.aggregate([
        {
            $match: {
              _id: new mongoose.Types.ObjectId(userId)
            }
          },
 {
    $lookup: {
      from: "transactions",  // The collection to join with
      localField: "transaction",  // The field in the user document that holds the transaction ObjectIds
      foreignField: "_id",  // The field in the transaction document that corresponds to the user transaction ID
      as: "transactionDetails"  // The field to store the joined transaction data
    }
  },
  {
    $unwind : "$transactionDetails"
  },
{
  $project : { userName : 0,
    _id:0,
    emailId : 0,
    password : 0,
    transaction : 0,
    createdAt:0,
    updatedAt:0,
    __v:0


  }
}
])


const totalExpense = results.reduce((acc,element)=>{
        acc = element.transactionDetails.amount +acc
         return(acc)
 },0)



    console.log("Total Expense is :",totalExpense);
 
}),


deleteCategory  : asyncHandler(async(req,res)=>{

    const {id} = req.user
    console.log(id)
    const {category} = req.body

    if(!category)
        throw new Error("Data incomplete")


    const deleteCategory =await Category.findByIdAndDelete(id,{category})

    if(!deleteCategory)
        throw new Error("Deletion unsucessfull")



// if(deleteCategory)
//     res.send("Category successfully deleted")

console.log(deleteCategory)

}),



getCategoryExpense: asyncHandler(async(req,res)=>{

    
    const {id} = req.user
    const {category} = req.body

    if(!category)
        throw new Error("Incomplete data")


    const results = await User.aggregate([
        {
          $match: { _id: new mongoose.Types.ObjectId(userId) }
        },
        {
          $lookup: {
            from: "transactions",
            localField: "transaction",
            foreignField: "_id",
            as: "transactionDetails"
          }
        },
        { $unwind: "$transactionDetails" },
        {
          $project: {
            "transactionDetails.amount": 1  // Only project amount for calculation
          }
        }
      ]);
      
      // Calculate the total expense in a simplified way
      const totalExpense = results.reduce((sum, { transactionDetails }) => sum + transactionDetails.amount, 0);
      
      console.log("Total Expense is:", totalExpense);

}),

categoryTransaction : asyncHandler(async(req,res)=>{         //Full list of transactions        

    const userId  = req.user
    console.log(userId)

    const {category} = req.body
    console.log(category)


   const results = await Transaction.aggregate([
        {
          $match: { _id : new mongoose.Types.ObjectId(userId) }
        },
        {
          $lookup: {
            from: "categories",
            localField: "_id",
            foreignField: "_id",
            as: "transactionDetails"
          }
        },
        { $unwind: "$transactionDetails" },
        
        
      ])
      
      // Calculate the total expense in a simplified way
      console.log(results);
      


    
    // const user = userCheck.category 



})

}

module.exports = transactionController

