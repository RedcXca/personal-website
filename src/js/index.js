
const navbar = document.getElementById("navbar");
if (navbar) {
  document.documentElement.style.setProperty("--nav-height", navbar.offsetHeight.toString());
}

$(function () {
  const $galleryScroll = $(".gallery-scroll");
  const $leftArrow = $("#left-arrow");
  const $rightArrow = $("#right-arrow");
  const scrollAmount = 0.5 * window.innerWidth;
  const ANIMATION_DURATION = 400;

  if ($galleryScroll.length && $leftArrow.length && $rightArrow.length) {
    function updateArrowVisibility() {
      const currentScrollLeft = $galleryScroll.scrollLeft() ?? 0;
      const scrollWidth = $galleryScroll[0].scrollWidth;
      const clientWidth = $galleryScroll[0].clientWidth;
      if (currentScrollLeft <= 0) {
        $leftArrow.removeClass("visible");
      } else {
        $leftArrow.addClass("visible");
      }
      if (currentScrollLeft + clientWidth >= scrollWidth) {
        $rightArrow.removeClass("visible");
      } else {
        $rightArrow.addClass("visible");
      }
    }

    $leftArrow.on("click", function () {
      const currentScrollLeft = $galleryScroll.scrollLeft() ?? 0;
      $galleryScroll.animate(
        { scrollLeft: currentScrollLeft - scrollAmount },
        ANIMATION_DURATION,
        updateArrowVisibility
      );
    });

    $rightArrow.on("click", function () {
      const currentScrollLeft = $galleryScroll.scrollLeft() ?? 0;
      $galleryScroll.animate(
        { scrollLeft: currentScrollLeft + scrollAmount },
        ANIMATION_DURATION,
        updateArrowVisibility
      );
    });

    $galleryScroll.on("scroll", updateArrowVisibility);
    updateArrowVisibility();
  }

  window.addEventListener("scroll", function () {
    const parallax = document.querySelector(".hero");
    if (parallax) {
      parallax.style.backgroundPositionY = (window.pageYOffset / document.body.scrollHeight) * 70 + "px";
    }
  });

  const backgroundMusic = document.getElementById("background-music");
  const musicToggle = document.getElementById("music-toggle");
  
  if (backgroundMusic) {
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
});
