import React, { useState } from 'react';
import './App.css';

const imageUrls = [
  'https://thumbs.dreamstime.com/b/bunch-bananas-6175887.jpg?w=768',
  'https://thumbs.dreamstime.com/z/full-body-brown-chicken-hen-standing-isolated-white-backgroun-background-use-farm-animals-livestock-theme-49741285.jpg?ct=jpeg',
  'https://thumbs.dreamstime.com/b/bunch-bananas-6175887.jpg?w=768',
  'https://thumbs.dreamstime.com/z/full-body-brown-chicken-hen-standing-isolated-white-backgroun-background-use-farm-animals-livestock-theme-49741285.jpg?ct=jpeg',
  'https://thumbs.dreamstime.com/b/bunch-bananas-6175887.jpg?w=768',
  'https://thumbs.dreamstime.com/z/full-body-brown-chicken-hen-standing-isolated-white-backgroun-background-use-farm-animals-livestock-theme-49741285.jpg?ct=jpeg',

];

function getRandomImage() {
  const index = Math.floor(Math.random() * imageUrls.length);
  return imageUrls[index];
}

function App() {
  const [images, setImages] = useState(Array(36).fill().map(() => ({
    image:getRandomImage(),
    revealed:false,
  }))
);

  const handleClick = (index) => {
    setImages(images.map((img, i) => {
      if (i === index){
        return{...img, revealed: true};
      }
      return img;
    }));
  };
  const handleReset = (index) => {
    setImages(Array(36).fill().map(() => ({
      image: getRandomImage(),
      revealed: false,
    })));
  };

  return (
    <div className="container">
      <h1> Chicken Banana Game!</h1>
      <button onClick={handleReset}>Reset Game</button>
      <div className="grid">
        {images.map((img, index) => (
          <div
            key={index}
            className={`square ${img.revealed ? 'revealed' : ''}`}
            onClick={() => handleClick(index)}
          >
            <img src={img.image} alt="Object" />
            </div>
        ))}
      </div>
    </div>
  );
}

export default App;