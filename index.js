
    const express = require ("express")
    const bodyParser = require('body-parser')
    var app = express();
    const mongoDb = require('./models/mongoose')
    const del = require('./routers/delete');
    const get = require('./routers/get');
    const put = require('./routers/put');
    const post = require('./routers/post');
  const getImg = require('./routers/getImg');
   const postImg = require('./routers/postImg');
   //const awspost = require('./routers/awspost');
  // const awsget = require('./routers/awsget');
const s3Controller = require ('./src/s3-controller');
    const port = 8008
    const validateToken = require("./middleware/validateTokenHandler");


    app.use(express.json())

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }));

    app.listen(8008,()=>{
        console.log("connected to port", port)
    })

// app.use(validateToken);
    app.use('/delete',del)
    app.use('/get',get)
    app.use('/put',put)
    app.use('/post',post)
    app.use('/upload',postImg)
    app.use('/retrive',getImg)
    app.use('/users',require("./routers/userRoute"))
    
    //app.use('/awsUpload',awspost)

 //app.use('/awsRetrive',awsget)
  
//app.post('/upload-to-s3',s3Controller.s3Upload);





    
