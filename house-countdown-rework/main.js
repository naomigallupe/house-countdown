const backgroundImages = [
  './assets/X12146391_0.jpg',
  './assets/X12146391_44_0.jpg',
  './assets/X12146391_45_0.jpg',
  './assets/X12146391_49_0.jpg',
];

let backgroundIndex = 0;
let hasCelebrated = false;
const targetDate = new Date('2025-07-30T17:00:00').getTime();

document.body.style.backgroundImage = `url(${backgroundImages[backgroundIndex]})`;

document.getElementById('changeBackgroundBtn').addEventListener('click', () => {
  backgroundIndex = (backgroundIndex + 1) % backgroundImages.length;
  document.body.style.backgroundImage = `url(${backgroundImages[backgroundIndex]})`;
});

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

function updateCountdown() {
  const countdown = document.getElementById('countdown');
  const timeLeft = getTimeRemaining();

  countdown.textContent = `${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`;

  if (
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0 &&
    !hasCelebrated
  ) {
    celebrate();
    hasCelebrated = true;
  } else {
    randomFirework();
  }
}

function celebrate() {
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 },
      });
    }, i * 500);
  }
}

function randomFirework() {
  confetti({
    particleCount: 30,
    spread: 45,
    origin: { x: Math.random(), y: Math.random() * 0.5 },
  });
}

setInterval(updateCountdown, 1000);
