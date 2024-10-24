const express = require('express') 
const userController = require('../controller/userController')
const middleware = require('../middleware/middleware')
const userRoute = express.Router() 
userRoute.post('/register',userController.register)
userRoute.post('/signin',userController.signIn)
userRoute.post('/logout',userController.logout)
userRoute.post('/changepassword',userController.changePassword)
userRoute.post('/changename',userController.changeName)


module.exports = userRoute 
