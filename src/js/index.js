
function setNavbarHeight() {
  const navbar = document.getElementById("navbar");
  if (navbar) {
    document.documentElement.style.setProperty("--nav-height", navbar.offsetHeight.toString());
  }
}

function initParallaxScrolling() {
  window.addEventListener("scroll", function () {
    const parallax = document.querySelector(".hero");
    if (parallax) {
      parallax.style.backgroundPositionY = (window.pageYOffset / document.body.scrollHeight) * 70 + "px";
    }
  });
}

function initBackgroundMusic() {
  const backgroundMusic = document.getElementById("background-music");
  const musicToggle = document.getElementById("music-toggle");
  
  if (!backgroundMusic) return;
  
  backgroundMusic.volume = 0.2;
  
  const savedTime = parseFloat(localStorage.getItem('musicTime') || '1');
  const isPlaying = localStorage.getItem('musicPlaying') === 'true';
  
  backgroundMusic.currentTime = savedTime;
  
  if (isPlaying) {
    backgroundMusic.play().catch(() => {});
  }
  
  if (musicToggle) {
    musicToggle.textContent = isPlaying ? "⏸" : "▶";
    
    musicToggle.addEventListener("click", () => {
      if (backgroundMusic.paused) {
        backgroundMusic.play();
        musicToggle.textContent = "⏸";
      } else {
        backgroundMusic.pause();
        musicToggle.textContent = "▶";
      }
    });
  }
  
  backgroundMusic.addEventListener("play", () => {
    musicToggle.textContent = "⏸";
    localStorage.setItem('musicPlaying', 'true');
  });
  
  backgroundMusic.addEventListener("pause", () => {
    musicToggle.textContent = "▶";
    localStorage.setItem('musicPlaying', 'false');
  });
  
  backgroundMusic.addEventListener("timeupdate", () => {
    localStorage.setItem('musicTime', backgroundMusic.currentTime);
  });
}

function initRainEffect() {
  const rainEffect = document.getElementById("rain-effect");
  if (!rainEffect) return;
  
  rainEffect.classList.add("active");
  createRainDrops();
}

function stopRainEffect() {
  const rainEffect = document.getElementById("rain-effect");
  if (!rainEffect) return;
  
  rainEffect.classList.remove("active");
  rainEffect.innerHTML = "";
}

function createRainDrops() {
  const rainEffect = document.getElementById("rain-effect");
  if (!rainEffect) return;
  
  const rainCount = 50;
  
  for (let i = 0; i < rainCount; i++) {
    const drop = document.createElement("div");
    drop.className = "rain-drop";
    
    const left = Math.random() * 100;
    const delay = Math.random() * 3;
    const duration = 2 + Math.random() * 3;
    
    drop.style.left = left + "%";
    drop.style.animationDelay = delay + "s";
    drop.style.animationDuration = duration + "s";
    
    rainEffect.appendChild(drop);
  }
}

$(function () {
  setNavbarHeight();
  initParallaxScrolling();
  initBackgroundMusic();
  initRainEffect();
});
