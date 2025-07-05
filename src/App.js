import React, { useState } from 'react';
import './App.css';

const imageUrls = [
  'https://ih1.redbubble.net/image.5810842835.3169/st,small,507x507-pad,600x600,f8f8f8.jpg', // banana
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE9TM1Zgq-DKGAV34yAKU5btjRMHAdPXT-OQ&s', // chicken
];

function getRandomImage() {
  const index = Math.floor(Math.random() * imageUrls.length);
  return imageUrls[index];
}

function getImageType(url) {
  return url.includes('banana') ? 'banana' : 'chicken';
}

function App() {
  const [images, setImages] = useState(
    Array(36)
      .fill()
      .map(() => ({
        image: getRandomImage(),
        revealed: false,
      }))
  );

  const [currentPlayer, setCurrentPlayer] = useState('chicken');

  const handleClick = (index) => {
    if (images[index].revealed) return;

    const clickedImageType = getImageType(images[index].image);

    setImages((prevImages) =>
      prevImages.map((img, i) =>
        i === index ? { ...img, revealed: true } : img
      )
      
    );

    if (clickedImageType !== currentPlayer) {
      alert('You lose!');
      handleReset();
      return;
    }

    setCurrentPlayer((prev) => (prev === 'chicken' ? 'banana' : 'chicken'));
  };

  const handleReset = () => {
    setImages(
      Array(36)
        .fill()
        .map(() => ({
          image: getRandomImage(),
          revealed: false,
        }))
    );
    setCurrentPlayer('chicken');
  };

  return (
    <div className="container">
      <h1>Chicken Banana Game!</h1>
      <p>Current player: <b>{currentPlayer}</b></p>
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
