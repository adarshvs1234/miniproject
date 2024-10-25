const express =  require('express')
const transactionController = require('../controller/transactionController')
const categoryRouter = express.Router()

categoryRouter.post("/category",transactionController.addCategory)
categoryRouter.delete("/category/delete_category",transactionController.deleteCategory)


module.exports =  categoryRouter