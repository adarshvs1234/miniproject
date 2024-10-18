const mongoose = require('mongoose')
const productSchema = new mongoose.schema({
    name : {
        type:String
    },
    description:{
        type:String
    },
    price: {
        type :Number
    }
    
})
const Product = mongoose.model('Product',productSchema)
module.exports = Product







 