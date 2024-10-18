const mongoose = require('mongoose')
const cartSchema = new mongoose.schema({
    productId:{
       type:Number
    },
    productName:{
       type:String
    },
    totalProductsAdded:{
       type:Number
    },
    totalPrice : {
       type: Number
    }

})
const Cart = mongoose.model('Cart',cartSchema)


module.exports = Cart