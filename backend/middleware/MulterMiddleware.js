const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
        cb(null, "./public/uploads")},
        filename: (req, file, cb) => {
        cb(null, `${uuidv4()}_${path.extname(file.originalname)}`);
        }
    });

    // const fileFilter = (req, file, cb) => {
    //     const allowedFileTypes = [ "file/pdf","video/mp4" ];
    //     if (allowedFileTypes.includes(file.mimetype)) {
    //     cb(null, true);
    //     } else {
    //     cb(null, false);
    //     }
    // };

    //fileFilter مكانها في اقواس المولتور

    const uploadMiddleware = multer({ storage });

module.exports = uploadMiddleware;
