import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';


function CommunitySlider() {
    const images = [
        'https://satsang-foundation.org/wp-content/uploads/2023/10/Picture-1_Inauguration-of-Events-Plastic-Waste-Cleaning.jpg',
        'https://cdnuploads.aa.com.tr/uploads/Contents/2022/06/05/thumbs_b_c_dfdb42732bf3aacc492c13f86de21101.jpg?v=094731',
        "https://www.punekarnews.in/wp-content/uploads/2021/10/pune-plogathon-1.jpg",
        "https://images.hindustantimes.com/rf/image_size_960x540/HT/p2/2018/06/05/Pictures/assignment-name-in-brief_901538e4-68d1-11e8-8033-47bccc77d658.jpg",
        "https://assets.thehansindia.com/h-upload/2023/03/14/1341717-students.webp"
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

export default CommunitySlider