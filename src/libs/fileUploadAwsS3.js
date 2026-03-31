
const {S3Client, PutObjectCommand} = require('@aws-sdk/client-s3')

const {getSignedUrl } = require('@aws-sdk/s3-request-presigner')


/**
 * Initialize s3 client
 */

const client = new S3Client({ 
    region: process.env.AWS_REGION || 'ap-south-1',
    credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    }
 });

const createPresignedUrlWithClient = ({ bucket, key }) => {
  
  const command = new PutObjectCommand({ Bucket: bucket, Key: key });
  return getSignedUrl(client, command, { expiresIn: 3600 });
};



module.exports = createPresignedUrlWithClient