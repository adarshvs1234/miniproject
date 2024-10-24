const express = require('express')
const userRouter = require('./userRouter')
const transactionRouter = require('./transactionRouter')

const router = express()
router.use('/user',userRouter)
module.exports = router
