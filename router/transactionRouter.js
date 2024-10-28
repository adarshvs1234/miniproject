const express = require('express')
const transactionController = require('../controller/transactionController')
const transactionRouter = express.Router()

transactionRouter.post("/transaction",transactionController.addTransaction)
transactionRouter.get("/summary",transactionController.summary)
transactionRouter.get("/get_category_expense",transactionController.getCategoryExpense)
transactionRouter.put("/transaction/:id",transactionController.updateTransaction)
transactionRouter.get("/transaction/:id",transactionController.getTransaction)
transactionRouter.delete("/transaction/:id",transactionController.deleteTransaction)





module.exports = transactionRouter  

