import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import backgroundImage from './assets/X12146391_0.jpg';
import backgroundImage2 from './assets/X12146391_44_0.jpg';
import backgroundImage3 from './assets/X12146391_45_0.jpg';
import backgroundImage4 from './assets/X12146391_49_0.jpg';
import confetti from 'canvas-confetti';

function App() {
  const targetDate = new Date('2025-07-30T17:00:00').getTime();
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());
  const [hasCelebrated, setHasCelebrated] = useState(false);

  function getTimeRemaining() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  useEffect(() => { // useEffect can run more than once
    const timer = setInterval(() => {
      const updatedTime = getTimeRemaining();
      setTimeLeft(updatedTime);
      // hasCelebrated = false
      if ( // checks if not true
        updatedTime.days === 0 &&
        updatedTime.hours === 0 &&
        updatedTime.minutes === 0 &&
        updatedTime.seconds === 0 &&
        !hasCelebrated // ! is not setting value but checking the value, if not true = false,  
        // !false = not false = true
        // ! = not
      ) {
        celebrate();
        setHasCelebrated(true);
      } else {
        randomFirework(); // runs small fireworks every second
      }
    }, 1000); // milliseconds

    return () => clearInterval(timer);
  }, [hasCelebrated]);

  const celebrate = () => {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        confetti({
          particleCount: 200,
          spread: 70,
          origin: { y: 0.6 },
        });
      }, i * 500);
    }
  };

  const randomFirework = () => {
    confetti({
      particleCount: 30,
      spread: 45,
      origin: { x: Math.random(), y: Math.random() * 0.5 },
    });
  };

  const backgroundImages = [
    backgroundImage,
    backgroundImage2,
    backgroundImage3,
    backgroundImage4,
  ];

  // let index = 0;
  // const changeBackgroundBtn = document.getElementById('changeBackgroundBtn');

  // changeBackgroundBtn.addEventListener('click', () => {
  //   index = (index + 1) % backgroundImages.length;
  //   document.body.style.backgroundImage = backgroundImages;
  // });

const [backgroundIndex, setBackgroundIndex] = useState(0); // to set state variable for Change Background CTA

useEffect(() => { // assigns a backgroundImage to an image in the backgroundImages object depending on backgroundIndex value 
  document.body.style.backgroundImage = backgroundImages[backgroundIndex];
  }, [backgroundIndex]); // runs only when backgroundIndex is changed - triggered by onClick event

const handleBackgroundChange = () => { // function for onClick evemt
  setBackgroundIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length); 
  // increase by 1, loop at end of backgroundImages list, remainder symbol
};





// NOTES:
// add timeout method to reduce load time
// try removing one or the other 
// try setting varible instead of use effect - try without it
// DO ONE FUNCTION only to be responsible for one thing 
// try random for set image - add 2 buttons - random button and by order
// try putting html back in index.nhtml
// try putting styles in css - can it be reused?

return (
  <div
    className="App"
    style={{
      backgroundImage: `url(${backgroundImages[backgroundIndex]})`, // not sure why url
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
      color: 'white',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <div className="star-background">
      <h1 className="glow-text">House Countdown</h1>
      <h2 className="glow-text">
        {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
      </h2>
       <button onClick={handleBackgroundChange}>Change Background</button>
    </div >
  </div>
);
}

export default App;
