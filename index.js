const express = require('express')
const route = require('./router')
const dbConnect = require('./mongoDb')

dbConnect()

const app = express()
const PORT = 5000

app.use(express.json())

app.use(route)


app.listen(PORT,()=>
console.log("It's running  http://localhost:5000/")
)
