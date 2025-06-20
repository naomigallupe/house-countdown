import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import backgroundImage from './assets/X12146391_0.jpg';
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

  useEffect(() => {
    const timer = setInterval(() => {
      const updatedTime = getTimeRemaining();
      setTimeLeft(updatedTime);

      if (
        updatedTime.days === 0 &&
        updatedTime.hours === 0 &&
        updatedTime.minutes === 0 &&
        updatedTime.seconds === 0 &&
        !hasCelebrated
      ) {
        celebrate();
        setHasCelebrated(true);
      } else {
        randomFirework(); // runs small fireworks every second
      }
    }, 1000);

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

return (
  <div
    className="App"
    style={{
      backgroundImage: `url(${backgroundImage})`,
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
    </div>
  </div>
);
}

export default App;
