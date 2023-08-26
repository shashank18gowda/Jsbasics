const path = require('path')
const multer = require('multer');


const storage = multer.diskStorage({
	destination: './uploads',
	filename: function (req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname);
	},
});

const upload = multer({
	storage: storage,
	limits:{  fileSize : 200000},
	fileFilter(req, file, callback) {
		
		const extension=  ['.png', '.jpg', '.jpeg'].indexOf(path.extname(file.originalname).toLowerCase()) >= 0;
		const mimeType = ['image/png', 'image/jpg', 'image/jpeg'].indexOf(file.mimetype) >= 0;
		
		 if (extension && mimeType) {
		  return callback(null, true);
		}
		
		return callback('Invalid file type. Only picture file on type PNG and JPG are allowed!')
	  },
	})

module.exports = upload
