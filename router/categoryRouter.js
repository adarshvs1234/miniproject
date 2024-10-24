const express =  require('express')
const categoryController = require('../controller/categoryController')
const categoryRouter = express.Router()

categoryRouter.post("/category",categoryController.addCategory)

module.exports =  categoryRouter