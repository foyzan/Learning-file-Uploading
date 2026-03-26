const multer = require('multer')
const path = require('path')

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
    dest: path.join(process.cwd(), 'upload'),
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    },
   
})


module.exports = upload