const express = require('express')
const transactionController = require('../controller/transactionController')
const transactionRouter = express.Router()

transactionRouter.post("/addtransaction",transactionController.addTransaction) 
transactionRouter.post("/updatetransaction",transactionController.updateTransaction)
transactionRouter.post("/gettransaction",transactionController.getTransaction)
transactionRouter.post("/deletetransaction",transactionController.deleteTransaction)

module.exports = transactionRouter