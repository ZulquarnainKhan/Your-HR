const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadFile, findResume, deleteAllFiles } = require('../controllers/fileController');

const upload = multer({ dest: 'uploads/' });

// Route to upload a file
router.post('/upload', upload.single('resume'), uploadFile);

// Route to get resume by userId
router.post('/findResume', findResume);

// Route to delete all files
router.delete('/deleteAllResume',deleteAllFiles);

module.exports = router;
