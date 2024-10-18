const mongoose = require('mongoose')    
const reviewSchema = new mongoose.schema({
    rating:{
        type:Number
    }

})
const Review = mongoose.model('Review',reviewSchema)
module.exports = Review