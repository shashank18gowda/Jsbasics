const path = require('path');

const express = require('express');
const multer = require('multer');
const router = express.Router();
const Image = require('../models/imagemodel');
const upload = require('../middleware/upload');



router.post('/images', upload.array('image',25), async (req, res) => {

	try {
		const uploadedImages = req.files;
		
		if(uploadedImages.length > 20 ){
			return res.send("limit exceeded Only 20 images at a time ");
		}
		if (!uploadedImages || uploadedImages == "" || !uploadedImages ) {
			return res.send('Image is required');
		}
	//const baseurl = `http:/retrive/images/`
		const imagePromises = uploadedImages.map(async (file) => {
			const { filename, originalname } = file;
			// const url = baseurl + filename;
			const image = new Image({
				filename,
				originalName: originalname
				//url: baseurl + filename
			});
			await image.save();	
		});

		await Promise.all(imagePromises);
		return res.send('Image uploaded successfully');

	} catch (error) {
		return res.send('Provide a Image to upload '+ error.stack);
	}
});

// router.post("/awsUpload", async(req,res)=>{
//     const result = await uploadFile();
//     console.log(result);
//     res.send(result);
//   });



router.use((err, req, res, next) => {
	if (err instanceof multer.MulterError) {
		return res.status(400).send( err.message + " maximum image size is 200kb");
	}
	next(err);
});
module.exports = router;

	
	// const upload = multer({
	// 	storage: storage,
	// 	limits: { fileSize: 5 * 1024 * 1024 },
	// 	async fileFilter(req, file, callback) {
	// 		try{
	// 		const extension=  ['.png', '.jpg', '.jpeg'].indexOf(path.extname(file.originalname).toLowerCase()) >= 0;
	// 		const mimeType = ['image/png', 'image/jpg', 'image/jpeg'].indexOf(file.mimetype) >= 0;
	
	// 		if (extension && mimeType) {
	// 		  return callback(null, true);
	// 		}catch(error){
	// 		return callback('Invalid file type. Only picture file on type PNG and JPG are allowed!')
	// 	  },
	// 	})




// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, '/tmp/my-uploads')
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     cb(null, file.fieldname + '-' + uniqueSuffix)
//   }
// })

// const upload = multer({ storage: storage })

// app.post('/', function (req, res) {
//   upload(req, res, function (err) {
//     if (err instanceof multer.MulterError) {
//       return console.log("A Multer error occurred when uploading.");
//     } else if (err) {
//       return console.log("A unknown error occurred when uploading.");

//     }

//    res.send("upload successfully")
//   })
// })


// var imgSchema = require('../models/imagemodel');
// var fs = require('fs');
// var path = require('path');
// app.set("view engine", "ejs");
// require('dotenv').config();

// var storage = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 		cb(null, 'uploads')
// 	},
// 	filename: (req, file, cb) => {
// 		cb(null, file.fieldname + '-' + Date.now())
// 	}
// });

// var upload = multer({ storage: storage });

// app.get('/', (req, res) => {
// 	imgSchema.find({})
// 	.then((data, err)=>{
// 		if(err){
// 			console.log(err);
// 		}
// 		res.send({items: data})
// 	})
// });


// app.post('/', upload.single('image'), (req, res, next) => {

// 	var obj = {
// 		name: req.body.name,
// 		desc: req.body.desc,
// 		img: {
// 			data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
// 			contentType: 'image/png'
// 		}
// 	}
// 	imgSchema.create(obj)
// 	.then ((err, item) => {
// 		if (err) {
// 			console.log(err);
// 		}
// 		else {
// 			// item.save();
// 			res.redirect('/');
// 		}
// 	});
// });

// var port = process.env.PORT || '3000'
// app.listen(port, err => {
// 	if (err)
// 		throw err
// 	console.log('Server listening on port', port)
// })


// module.exports = app






























// const img = require('../models/imagemodel')
// const upload = multer({ dest: 'uploads/' })

// app.post("/",upload.single('testImg'),(req,res)=>{

// console.log();


// __filename.function(req,file,cb){
//     return cb(null,)
//     Date.now()}
//     file.originalname
// });

// // const Storage = multer.diskStorage({
// //     destination: (req, file, cb) => {
// //         cb(null, './uploads/');
// //     },
// //     filename: (req, file, cb) => {
// //         let datetime =Date.now();
// //         cb(null,"node="+datatime+"="+ file.originalname.split(".")(file.originalname.split('0').length-1));
// //     }
// // });

// // const upload = multer({
//     storage: Storage
// //});


// // app.post('/uploadImg', upload.single("image"), (req, res) => {
// //     console.log(req.file)


// //     upload(req, res, async (err) => {
// //         // if (err) {
// //         //     res.send(err.stack)
// //         // } else {
// //         //     const newImage = new img({
// //         //         name: req.body.name,
// //         //         image: {
// //         //             data: req.file.filename,
// //         //             contentType: 'image/png'
// //         //         }
// //         //     })

// //         //     await newImage.save();
// //         res.send("Successfully uploaded");
// //         // }
// //         // }); catch (error) {
// //         //     res.send("An error occurred while uploading the image." + error.stack);
// //         // }
// //     });
// // });

