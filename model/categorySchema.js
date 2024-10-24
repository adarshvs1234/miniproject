const mongoose  = require('mongoose')

const categorySchema = new mongoose.Schema({

    newCategory :{
        type:String
    }
})
module.exports = categorySchema