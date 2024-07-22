import React, { useState } from 'react';
import axios from 'axios';
import './ImageWithBoxes.css';
import Navbar1 from './Navbar';
import { MDBInput } from 'mdb-react-ui-kit';
import Button from 'react-bootstrap/Button';
const ImageForm = () => {
const [imageLink, setImageLink] = useState('');
const [responseData, setResponseData] = useState(null);

const handleSubmit = (event) => {
event.preventDefault();


axios({
  method: 'POST',
  url: 'https://detect.roboflow.com/blood-detection-xnwfc/1',
  //https://detect.roboflow.com/blood-cell-detection-1ekwu/3
  //https://detect.roboflow.com/blood-detection-xnwfc/1
  //KIcZhilYOAiThQwvQDvc
  params: {
    api_key: 'KIcZhilYOAiThQwvQDvc',
    image: imageLink,
  },
})
.then(function(response) {
  setResponseData(response.data);
  console.log('Response data:', response.data);
})
.catch(function(error) {
  console.error('Error sending image link:', error.message);
});
};

return (
 
 
<div>
  <Navbar1></Navbar1>
<form style={{marginLeft:'32rem' , marginTop:'2rem', borderBlockStartColor:'blue' , borderBlockEndColor:'blue' }} onSubmit={handleSubmit} >
 
<MDBInput style={{width:'30rem' , borderLeft:'4rem' ,borderBlockColor:'blue' }}label="Image URL" id="typeURL" type="url" value={imageLink}
onChange={(e) => setImageLink(e.target.value)}/>


<button style={{backgroundColor:'black' , marginLeft:'12rem'}} type="submit"><a style={{color:"white"}} >Run Inference</a></button>

</form>


  {responseData && (
    <div>
      <div style={{ position: 'absolute', display: 'inline-block', left:'21rem' ,marginBottom:'5rem' , marginTop:'1rem'}}>
  <img src={imageLink} alt='Predictions' style={{width:'800px' , height:'600px' , marginBottom:'4rem'}}/>
  
  {responseData.predictions.map((prediction, index) => (
      
      
    <div

      key={index}
      className="bounding-box"
      style={{
        position: 'absolute',
        border: '2px solid red',
        left: `${(prediction.x/responseData.image.width)*800-15}px`,
        top: `${(prediction.y/responseData.image.height)*600-15}px`,
        width: `${(prediction.width/responseData.image.width)*1200 }px`,
        height: `${(prediction.height/responseData.image.height)*800}px`,
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
     
    </div>
  )}
</div>
);

};

export default ImageForm;