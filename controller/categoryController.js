const  asyncHandler = require("express-async-handler");
const Category = require("../model/categorySchema");

const {Error} = require('mongoose')

const   categoryController = {

    addCategory :  asyncHandler(async(req,res)=>{
        
        const {newCategory} = req.body

        if(!newCategory)
            throw new Error("Data incomplete")

        const createdCategory = await Category.create({
            newCategory
           
        })
         
        // const checkCategory = await Category.exists({newCategory})

        // if(checkCategory)
        //     console.log("hi");
        
})

}
module.exports = categoryController
