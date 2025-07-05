import React, { useState } from 'react';
import './App.css';

const imageUrls = [
  {
    image: 'https://ih1.redbubble.net/image.5810842835.3169/st,small,507x507-pad,600x600,f8f8f8.jpg',
    type: 'banana',
  },
  {
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE9TM1Zgq-DKGAV34yAKU5btjRMHAdPXT-OQ&s',
    type: 'chicken',
  },
];

function getRandomImage() {
  const index = Math.floor(Math.random() * imageUrls.length);
  return imageUrls[index];
}

function App() {
  const [images, setImages] = useState(
    Array(36)
      .fill()
      .map(() => {
        const randomImage = getRandomImage();
        return { ...randomImage, revealed: false };
      })
  );

  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const handleClick = (index) => {
    if (images[index].revealed || gameOver || !currentPlayer) return;

    const clickedImageType = images[index].type;

    if (currentPlayer === 'chicken') {
      if (clickedImageType === 'banana') {
        alert('CHICKEN STEPPED ON BANANA!');
        setCurrentPlayer('banana');
      }
    } else if (currentPlayer === 'banana') {
      if (clickedImageType === 'chicken') {
        setGameOver(true);
        alert('GAME OVER!');
      }
    }

    setImages((prevImages) =>
      prevImages.map((img, i) =>
        i === index ? { ...img, revealed: true } : img
      )
    );
  };

  const handleReset = () => {
    setImages(
      Array(36)
        .fill()
        .map(() => {
          const randomImage = getRandomImage();
          return { ...randomImage, revealed: false };
        })
    );
    setGameOver(false);
    setCurrentPlayer(null); // reset player selection
  };

  return (
    <div className="container">
      <h1>Chicken Banana Game!</h1>

      {!currentPlayer && (
        <div className="player-select">
          <p>Choose your player:</p>
          <button onClick={() => setCurrentPlayer('chicken')}>Chicken</button>
          <button onClick={() => setCurrentPlayer('banana')}>Banana</button>
        </div>
      )}

      {currentPlayer && (
        <>
          <p>{gameOver ? 'Game Over!' : `Current Player: ${currentPlayer}`}</p>
          <button onClick={handleReset}>Reset Game</button>
          <div className="grid">
            {images.map((img, index) => (
              <div
                key={index}
                className={`square ${img.revealed ? 'revealed' : ''}`}
                onClick={() => handleClick(index)}
              >
                {!img.revealed && <div className="number">{index + 1}</div>}
                {img.revealed && <img src={img.image} alt="Object" />}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
