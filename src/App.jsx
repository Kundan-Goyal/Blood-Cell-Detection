import React, { useState } from 'react';
import axios from 'axios';
import './ImageWithBoxes.css';
import Navbar1 from './Navbar';
import { MDBInput } from 'mdb-react-ui-kit';
import Button from 'react-bootstrap/Button';
import './App.css'; // Import custom CSS

const ImageForm = () => {
  const [imageLink, setImageLink] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [responseData, setResponseData] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setImageLink(URL.createObjectURL(file));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        const response = await axios({
          method: 'POST',
          url: 'https://detect.roboflow.com/blood-detection-xnwfc/1', // Replace with your endpoint
          params: {
            api_key: 'KIcZhilYOAiThQwvQDvc',
          },
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setResponseData(response.data);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    } else if (imageLink) {
      try {
        const response = await axios({
          method: 'POST',
          url: 'https://detect.roboflow.com/blood-detection-xnwfc/1',
          params: {
            api_key: 'KIcZhilYOAiThQwvQDvc',
            image: imageLink,
          },
        });
        setResponseData(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar1 />
      <div className="content-container">
        <form onSubmit={handleSubmit} className="image-form">
          <div className="form-group">
            <div className="file-upload">
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ opacity: 0, zIndex: -1, position: 'absolute' }}
              />
              <label
                htmlFor="imageUpload"
                className="custom-upload-button"
              >
                Upload Image
              </label>
            </div>
            <MDBInput
              className="custom-input"
              style={{ borderBlockColor: 'blue', borderColor: 'blue' }}
              label="Image URL"
              id="typeURL"
              type="url"
              value={imageLink}
              onChange={(e) => setImageLink(e.target.value)}
            />
            <Button className="custom-button" type="submit">Submit</Button>
          </div>
        </form>

        {responseData && (
          <div className="image-container">
            <img src={imageLink} alt='Predictions' className="response-image" />
            {responseData.predictions.map((prediction, index) => (
              <div
                key={index}
                className="bounding-box"
                style={{
                  position: 'absolute',
                  border: '2px solid red',
                  left: `${((prediction.x / responseData.image.width) * 800) - 20}px`,
                  top: `${(prediction.y / responseData.image.height) * 600 - 12}px`,
                  width: `${(prediction.width / responseData.image.width) * 800}px`,
                  height: `${(prediction.height / responseData.image.height) * 600}px`,
                  boxSizing: 'border-box',
                  pointerEvents: 'none'
                }}
              >
                <span style={{
                  position: 'absolute',
                  backgroundColor: 'red',
                  color: 'white',
                  fontSize: '12px',
                  padding: '2px 4px',
                  top: '-20px',
                  left: '0'
                }}>
                  {prediction.class}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageForm;
