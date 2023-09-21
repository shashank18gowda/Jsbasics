const bodyParser = require("body-parser");

require("dotenv").config();
const app = require('express')();
paymentRoute = require("./routes/paymentRouter")

PORT = 3003
app.use('/', paymentRoute);

app.listen(PORT,function(){
    console.log(`Server running on ${PORT}`);
})