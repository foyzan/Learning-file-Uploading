const {Router} = require('express')
const upload = require('../libs/fileUpload')

const router = Router()


router.post('/files', upload.single('avatar'), (req, res, next)=>{
    try {

        console.log(req.file)


        res.send('File uploaded successfully')
        
    } catch (error) {
        next(error)
    }
})


module.exports = router