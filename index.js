const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const uploadFiles = require("./routes/uploadFile");



app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp"
}));


app.use("/api/v1", uploadFiles);




const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));