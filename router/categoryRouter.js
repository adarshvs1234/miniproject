const express =  require('express')
const transactionController = require('../controller/transactionController')
const middleware = require('../middleware/middleware')

const categoryRouter = express.Router()


categoryRouter.post("/category_transaction",middleware,transactionController.categoryTransaction)
categoryRouter.delete("/delete_category",middleware,transactionController.deleteCategory)
categoryRouter.get("/category_expense",middleware,transactionController.getCategoryExpense)

module.exports =  categoryRouter
