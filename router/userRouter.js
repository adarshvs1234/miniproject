const express = require('express') 
const userController = require('../controller/userController')
const middleware = require('../middleware/middleware')
const userRoute = express.Router() 
userRoute.post('/register',userController.register)
// userRoute.get('/:num',middleware,userController.regb)
module.exports = userRoute 


