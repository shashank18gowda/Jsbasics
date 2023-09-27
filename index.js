const express = require("express")
const dotenv = require("dotenv")
dotenv.config()

const PORT = 5005
const bodyParser = require('body-parser')
const app = express()
const sequelize = require("./config/dbConfig")
// const multer = require("multer")
const { send } = require("./config/responseHelper")
const { RESPONSE } = require("./config/global")



app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));

sequelize
    .getConnection()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err.stack);
    });



// app.use('/users', require("./routers/userRoute"))
app.use('/cust', require("./routes/CustRouter"))

app.listen(PORT, () => {
    console.log(`connected to port`, PORT)
})








