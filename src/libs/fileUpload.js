const multer = require('multer')
const crypto = require('crypto')
const path = require('path')


const storage = multer.diskStorage({
    destination: (req, file, done)=>{
        done(null, path.join(process.cwd(), 'upload'),)
    },
    filename: (req, file, done)=>{

        // get file extension
        const fileExt = path.extname(file.originalname).toLowerCase()

        // get random name string
        const randomName = crypto.randomBytes(16).toString('hex');

        done(null, `${randomName}${fileExt}`)
    }
})


const fileFilter = (req, file, done)=>{
    const allowedMimeTypes = ['image/jpeg', 'image/png'];
    const filetype = file.mimetype.toLowerCase();

    if(allowedMimeTypes.includes(filetype)){
        done(null, true);
    }else {
        done(new Error('Invalid file types'), false)
    }
}


const upload = multer({
    storage: storage,
    dest: path.join(process.cwd(), 'upload'),
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    },
   
})


module.exports = upload