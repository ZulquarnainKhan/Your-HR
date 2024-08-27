const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const File = require('../models/File');
require('dotenv').config();

// api key = 0445571bddc20953c3b6
// api secret key = 0445571bddc20953c3b6


// Pinata API credentials


const uploadFileToPinata = async (filePath) => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  let data = new FormData();

  // Read file from the filesystem
  data.append('file', fs.createReadStream(filePath));

  const response = await axios.post(url, data, {
    maxContentLength: 'Infinity', // Make sure to increase the max content length if needed
    headers: {
      'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
      'pinata_api_key': process.env.PINATA_API_KEY,
      'pinata_secret_api_key': process.env.PINATA_SECRET_API_KEY
    }
  });

  return response.data;
};

// Controller function to upload a file and store metadata in MongoDB
exports.uploadFile = async (req, res) => {
  try {
    const { userId } = req.body;
    const filePath = req.file.path;
    const fileName = path.basename(filePath);

    // Upload file to Pinata
    const pinataResponse = await uploadFileToPinata(filePath);

    // Save file metadata to MongoDB
    const newFile = new File({
      userId,
      fileName,
      fileUrl: `https://gateway.pinata.cloud/ipfs/${pinataResponse.IpfsHash}`,
      fileKey: pinataResponse.IpfsHash
    });

    await newFile.save();

    // Remove file from local storage after upload
    fs.unlinkSync(filePath);

    res.status(200).json({
      msg: 'File uploaded successfully',
      file: newFile
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({
      msg: 'Error uploading file',
      error: error.message
    });
  }
};

// Controller function to retrieve file metadata by userId
exports.findResume = async (req, res) => {
  try {
    const { userId } = req.body;
    const file = await File.findOne({ userId });

    if (!file) {
      return res.status(404).json({ msg: 'File not found' });
    }

    res.status(200).json(file);
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
};

// Controller function to delete all files
exports.deleteAllFiles = async (req, res) => {
  try {
    await File.deleteMany({});
    res.status(200).json({ msg: 'All files deleted successfully' });
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
};
