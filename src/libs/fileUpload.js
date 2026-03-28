const multer = require('multer')
const crypto = require('crypto')
const path = require('path')


const storage = multer.diskStorage({
    destination: (req, file, done) => {
        done(null, path.join(process.cwd(), 'upload'),)
    },
    filename: (req, file, done) => {

        // get file extension
        const fileExt = path.extname(file.originalname).toLowerCase()

        // get random name string
        const randomName = crypto.randomBytes(16).toString('hex');

        done(null, `${randomName}${fileExt}`)
    }
})


const fileFilter = (req, file, done) => {
    const filetype = file.mimetype.toLowerCase();
    const fieldName = file.fieldname;

    // Use === for comparison
    if (fieldName === 'avatar' || fieldName === 'nid') {
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        
        if (allowedMimeTypes.includes(filetype)) {
            return done(null, true); // Use return to stop execution here
        } else {
            return done(new Error('Invalid image type for avatar'), false);
        }
    }

    if (fieldName === 'license') {
        const allowedMimeTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        
        if (allowedMimeTypes.includes(filetype)) {
            return done(null, true);
        } else {
            return done(new Error('Invalid document type for license'), false);
        }
    }

};


const upload = multer({
    storage: storage,
    dest: path.join(process.cwd(), 'upload'),
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    },

})


module.exports = upload