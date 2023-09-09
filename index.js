const express = require("express")
//const app = express()
const dotenv = require("dotenv")
dotenv.config()

const PORT = 8000
const bodyParser = require('body-parser')
//const testDbConnection = require("./config/dbConfig");

// const del = require('./routers/delete');
// const get = require('./routers/get');
// const put = require('./routers/put');
// const post = require('./routers/post');
// const getImg = require('./routers/getImg');
// const postImg = require('./routers/postImg');
//const getSearch = require('./routers/getSearch')
//const config = require("./run")[process.env.NODE_ENV || 'development'];
//const log = config.log();
const app = express()
const sequelize = require("./config/dbConfig")


app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

sequelize
    .getConnection()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err.stack);
    });



// app.use(validateToken);
// app.use('/delete', del)
// app.use('/get', get)
// app.use('/put', put)
// app.use('/post', post)
// app.use('/upload',postImg)
// app.use('/retrive',getImg)
// app.use('/getSearch',getSearch)

app.use('/users', require("./routers/userRoute"))
app.use('/emp', require("./routers/empRoute"))

app.listen(PORT, () => {
    console.log(`connected to port`, PORT)
})
