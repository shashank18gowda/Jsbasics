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
const multer = require("multer")



app.use(express.json());
// app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
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
app.use('/Food', require("./routes/routers/foodRouter"))
app.use('/Admin', require("./routes/routers/AdminRoute"))
app.use('/User', require("./routes/routers/UserRoute"))

app.use((err, req, res, next) => {
	if (err instanceof multer.MulterError) {
        console.log(err.message);
		return send(res,RESPONSE.ERROR,"file is too large");
	}
	next(err);
});


app.listen(PORT, () => {
    console.log(`connected to port`, PORT)
})








