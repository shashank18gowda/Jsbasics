const express = require ("express")
const mongoose = require("mongoose")
const path = require("path")
const bodyParser = require('body-parser')
const url = 'mongodb://0.0.0.0/crud_operation'
const app = express()
app.use(express.json())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

const port = 8008
mongoose.connect(url, {
    useNewUrlParser:true

})
const con = mongoose.connection
con.on('open',function(){
    console.log("connected to mongodb")
})


const router_2 = require('../task2crud/routers/route')
app.use('/route',router_2)



app.listen(8008,()=>{
    console.log("connected to port", port)
})



 
