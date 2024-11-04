const mongoose  = require('mongoose')

const categorySchema = new mongoose.Schema({

    category :{
        type:String
    },
    transactionType:{
        type : String
    },


 transaction  :[{                       //one to many (category -> transaction)
  type : mongoose.Types.ObjectId,
  ref : "Transaction"
 }]

})


const Category = mongoose.model('Category',categorySchema)

module.exports = Category