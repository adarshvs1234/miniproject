const express =  require('express')
const transactionController = require('../controller/transactionController')
const middleware = require('../middleware/middleware')

const categoryRouter = express.Router()

categoryRouter.post("/category",middleware,transactionController.addCategory)
categoryRouter.delete("/delete_category",middleware,transactionController.deleteCategory)


module.exports =  categoryRouter