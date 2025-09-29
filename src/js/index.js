
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

$(function () {
  setNavbarHeight();
  initParallaxScrolling();
  initBackgroundMusic();
});
