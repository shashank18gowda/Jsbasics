const router = require('express').Router();
const s3 = require("../utils/s3");
require('dotenv').config();
const AWS = require('aws-sdk');
const s = new AWS.S3();

//=======================================================
// router.post("/upload", (req, res) => {
//     // const file = req.files.file;

//     const file = req.files && req.files.file;

//     if (!file) {
//         return res.status(400).send("No file provided.");
//     }

//     s3.uploadToS3(file, (error, data) => {
//         if (error) {
//             return res.send("Something went wrong.");
//         }
//         return res.send("file uploaded successfully");
//     });
// });




router.post("/upload", (req, res) => {
 try{
    const file = req.files && req.files.file;
   const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
   
    if (!file) {
        return res.status(400).send("No file provided.");
    }

    if (!allowedMimeTypes.includes(file.mimetype)) {
        return res.status(400).send("Invalid file type")    }

    s3.uploadToS3(file, (error, data) => {
        if (error) {
            return res.send("Something went wrong.");
        }
    });    
        return res.send("File uploaded successfully");
}catch(er){
    return res.send("server error");
}
}); 

 //==========================================================

//  const upload = multer({
//     fileFilter: (req, file, callback) => {
//         if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//             callback(null, true);
//         } else {
//             callback(new Error("Invalid file type. Only JPEG and PNG files are allowed."));
//         }
//     }
// });

// Other code and configurations





const constantParams = {
    Bucket: process.env.AWS_BUCKET_NAME
}

router.get("/getFile/:filename", async (req, res) => {
    try {
        const filename = req.params.filename;
        const params = {
            Bucket: constantParams.Bucket,
            Key: filename
        };
        s.headObject(params, async (err, data) => {
            if (err) {
                return res.status(404).send("File does not exist.");
            }

        // if (!filename) {
        //     return res.status(400).send("filedoes not exist.");
        //   }

        // const params = { Key: filename };
        //let fileToSend = await s3.getFileFromS3();
        // const fileStream = s3.getObject(params).createReadStream();

        const fileStream = s3.getFileFromS3(filename);

        res.setHeader('Content-disposition', `attachment; filename=${filename}`);
        res.setHeader('Content-type', 'image/jpeg');

        //  fileToSend.pipe(res);
        fileStream.pipe(res);
        });
    } catch (error) {
        res.send(error.stack, "server error");
    }
});

router.delete("/deleteFile/:filename", (req, res) => {
    // s3.deleteFileFromS3(`example.jpg`,(error,data)=>{
    try {

        const filename = req.params.filename;
        const params = {
            Bucket: constantParams.Bucket,
            Key: filename
        };
        s.headObject(params, async (err, data) => {
            if (err) {
                return res.status(404).send("File not found.");
            }
        // const filename = req.params.filename;
        s3.deleteFileFromS3(filename, (error, data) => {
            if (error) {
                return res.send(error, "Can not delete file");
            }
            return res.send(`${filename},File deleted successfully`);
        });
    });
    } catch (er) {
        return res.send(er.stack, "something went wrong")
    }
});

module.exports = router;

