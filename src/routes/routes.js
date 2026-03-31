const { Router } = require("express");
const upload = require("../libs/fileUpload");
const createPresignedUrlWithClient = require("../libs/fileUploadAwsS3");
const { v4: uuidv4 } = require('uuid');

const router = Router();

// upload one file at a time
router.post("/files", upload.single("avatar"), (req, res, next) => {
    try {
        console.log(req.file);

        res.send("File uploaded successfully");
    } catch (error) {
        next(error);
    }
});

// upload multiple file at once with same fields name
router.post("/files-bulk", upload.array("avatar", 5), (req, res, next) => {
    try {
        console.log(req.files);

        res.send("File uploaded successfully");
    } catch (error) {
        next(error);
    }
});

router.post("/get-presigned-url", async (req, res, next) => {
    try {

        const { mimetype } = req.body
        const random = uuidv4();
        const filename = `uploads/${random}.${mimetype.split('/')[1]}`

        const url = await createPresignedUrlWithClient({
            bucket: process.env.AWS_S3_BUCKET_NAME,
            key: filename
    });

        res.json({ url, filename});
    } catch (error) {
        console.error("S3 Presigned URL Error:", error);
        next(error);
    }
});

// upload multiple fields with multiple filed

const fields = [
    {
        name: "avatar",
        maxCount: 4,
    },
    {
        name: "nid",
        maxCount: 2,
    },
    {
        name: "license",
        maxCount: 2,
    },
];

router.post("/vendor-apply", upload.fields(fields), (req, res, next) => {
    try {
        console.log(req.files);

        res.send("File uploaded successfully");
    } catch (error) {
        next(error);
    }
});

module.exports = router;
