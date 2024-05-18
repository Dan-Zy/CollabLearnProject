import path from "path";
import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/commentPictures/');
    },

    filename: function (req, file, cb) {
        cb(null,  Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage })

export default upload;