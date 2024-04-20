import React, { useState, useEffect } from 'react';

function ImageSlider() {
  const images = [
    'https://ecocart.io/wp-content/uploads/2023/04/iStock-1411289606.jpg',
    'https://storage.googleapis.com/jm-gcp-bethestory-p-12po-bucket/uploads/2023/04/ecodesign-packaging.jpg',
    "https://www.thepackagingcompany.com/knowledge-sharing/wp-content/uploads/2023/02/Advantages-Of-Buying-Eco-Friendly-Packaging-1080x675.jpg"
    // add more image URLs as needed
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((oldIndex) => {
        let index = oldIndex + 1;
        if (index > images.length - 1) {
          index = 0;
        }
        return index;
      });
    }, 2000); // Change image every 1 second

    return () => clearInterval(timer); // Clear the timer if the component is unmounted
  }, []);

  return (
    <div className="App">
      <img  src={images[index]} alt="slide-img" style={{width: '60%',marginLeft:"200px",marginTop:"150px"}} />
    </div>
  );
}

export default ImageSlider;
