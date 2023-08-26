const mongoose = require("mongoose")

const url = 'mongodb://0.0.0.0/crud_operation'

mongoose.connect(url, {
    useNewUrlParser:true

})
const con = mongoose.connection
con.on('open',function(){
    console.log("connected to mongodb")
})




