# File Upload Service

A Node.js and Express application for handling file uploads locally and generating pre-signed URLs for AWS S3.

## Features
- Local file storage using `multer`.
- File type validation (Images for avatars/NID, PDFs/Docs for licenses).
- AWS S3 Pre-signed URL generation for secure client-side uploads.

## Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your credentials:
   ```env
   AWS_S3_ACCESS_KEY=your_access_key
   AWS_S3_SECRET_ACCESS_KEY=your_secret_key
   AWS_S3_BUCKET_NAME=your_bucket_name
   ```
4. Start the server:
   ```bash
   npm start
   ```
