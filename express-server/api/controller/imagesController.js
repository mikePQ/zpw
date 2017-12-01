'use strict';

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, './images2')
    },

    filename: (request, file, callback) => {
        callback(null, file.originalname);
    }
});

const upload = multer({storage: storage}).single('file');

exports.addImage = (request, response) => {
    upload(request, response, error => {
        if (error) {
            response.json({message: error});
            return;
        }
        response.json({filePath: __dirname + "images2/" + request.file});
    });
};