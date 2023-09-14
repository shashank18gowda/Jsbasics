const { log } = require('console');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const fileFilter = (req, file, callback) => {
    const extension = ['.png', '.jpg', '.jpeg'].indexOf(path.extname(file.originalname).toLowerCase()) >= 0;
    const mimeType = ['image/png', 'image/jpg', 'image/jpeg'].indexOf(file.mimetype) >= 0;

    if (extension && mimeType) {
        return callback(null, true);
    }

    return callback('Invalid file type. Only picture file types PNG and JPG are allowed!');
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;