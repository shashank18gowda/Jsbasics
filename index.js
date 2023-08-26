
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

    const port = 8008


    app.use(express.json())

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }));

    app.listen(8008,()=>{
        console.log("connected to port", port)
    })

  
    
    app.use('/delete',del)
    app.use('/get',get)
    app.use('/put',put)
    app.use('/post',post)
    app.use('/upload',postImg)
    app.use('/retrive',getImg)

    
  
    





    
