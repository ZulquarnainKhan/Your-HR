import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UploadResume = () => {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // Still used for programmatic navigation

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    const userId = localStorage.getItem('userId');

    if (file) {
      const formData = new FormData();
      formData.append('resume', file);
      formData.append('userId', userId);

      try {
        // Replace with your API call to upload the resume
        const response = await fetch('https://your-hr-2ww9.onrender.com/api/resume/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          alert('Resume uploaded successfully!');
          navigate('/'); // Programmatic navigation
        } else {
          setErrorMessage('Failed to upload resume. Please try again.');
        }
      } catch (error) {
        setErrorMessage('Failed to upload resume. Please try again.');
      }
    } else {
      setErrorMessage('Please select a file before submitting.');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg border border-gray-200">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Please Log In</h2>
          <p className="text-center text-gray-600 mb-6">You need to log in before uploading your resume.</p>
          <Link
            to="/login"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Upload Your Resume</h2>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div
            className={`w-full h-48 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg transition-colors duration-300 ${
              dragging ? 'border-blue-500 bg-blue-50' : ''
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="file"
              className="hidden"
              onChange={handleFileSelect}
              accept=".pdf,.doc,.docx"
            />
            <label htmlFor="file" className="text-center text-gray-600 cursor-pointer">
              <div className="flex flex-col items-center">
                <svg
                  className="w-12 h-12 text-gray-400 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                </svg>
                <p className="text-lg font-medium">Drag & Drop your resume here or click to browse</p>
              </div>
            </label>
          </div>
          {file && (
            <div className="mt-4 text-center text-gray-600">
              <p className="text-sm">Selected File: {file.name}</p>
            </div>
          )}
          {errorMessage && (
            <div className="mt-4 text-center text-red-500">
              <p className="text-sm">{errorMessage}</p>
            </div>
          )}
          <button
            type="submit"
            className="mt-6 py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            disabled={!file}
          >
            Upload Resume
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadResume;
