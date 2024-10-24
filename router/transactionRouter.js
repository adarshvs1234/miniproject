const express = require('express')
const transactionController = require('../controller/transactionController')
const transactionRouter = express.Router()

transactionRouter.post("/addTransaction",transactionController.addTransaction) 


module.exports = transactionRouter