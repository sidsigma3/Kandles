const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const routeurl =require('./route')
const app = express()


app.use(express.json())
app.use(cors())

app.use('/',routeurl)  






app.listen(5000,()=>console.log('server is running in port 5000'))
