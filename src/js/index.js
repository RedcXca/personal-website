
const navbar = document.getElementById("navbar");
if (navbar) {
  document.documentElement.style.setProperty("--nav-height", navbar.offsetHeight.toString());
}

$(function () {
  const $galleryScroll = $(".gallery-scroll");
  const $leftArrow = $("#left-arrow");
  const $rightArrow = $("#right-arrow");
  const scrollAmount = 0.5 * window.innerWidth;
  const ANIMATION_DURATION = 400; // ms, duration for gallery scroll animation

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
    
    // Initialize arrow visibility on page load
    updateArrowVisibility();
  }

  // Parallax scrolling effect for the .hero section
  window.addEventListener("scroll", function () {
    const parallax = document.querySelector(".hero");
    if (parallax) {
      parallax.style.backgroundPositionY = (window.pageYOffset / document.body.scrollHeight) * 70 + "px";
    }
  });
});
