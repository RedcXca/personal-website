var navbar = document.getElementById("navbar");
if (navbar) {
    document.documentElement.style.setProperty("--nav-height", navbar.offsetHeight.toString());
}
$(function () {
    var $galleryScroll = $(".gallery-scroll");
    var $leftArrow = $("#left-arrow");
    var $rightArrow = $("#right-arrow");
    var scrollAmount = 0.5 * window.innerWidth;
    if ($galleryScroll.length && $leftArrow.length && $rightArrow.length) {
        // Function to update arrow visibility
        function updateArrowVisibility() {
            var _a;
            var currentScrollLeft = (_a = $galleryScroll.scrollLeft()) !== null && _a !== void 0 ? _a : 0;
            var scrollWidth = $galleryScroll[0].scrollWidth; // Total scrollable width
            var clientWidth = $galleryScroll[0].clientWidth; // Visible width
            // Show/hide left arrow
            currentScrollLeft <= 0
                ? $leftArrow.addClass("hidden")
                : $leftArrow.removeClass("hidden");
            // Show/hide right arrow
            currentScrollLeft + clientWidth >= scrollWidth
                ? $rightArrow.addClass("hidden")
                : $rightArrow.removeClass("hidden");
        }
        $leftArrow.on("click", function () {
            var _a;
            var currentScrollLeft = (_a = $galleryScroll.scrollLeft()) !== null && _a !== void 0 ? _a : 0; // Use nullish coalescing operator
            $galleryScroll.animate({
                scrollLeft: currentScrollLeft - scrollAmount,
            }, 400, updateArrowVisibility); // Update visibility after animation
        });
        $rightArrow.on("click", function () {
            var _a;
            var currentScrollLeft = (_a = $galleryScroll.scrollLeft()) !== null && _a !== void 0 ? _a : 0; // Use nullish coalescing operator
            $galleryScroll.animate({
                scrollLeft: currentScrollLeft + scrollAmount,
            }, 400, updateArrowVisibility); // Update visibility after animation
        });
        // Update visibility on scroll
        $galleryScroll.on("scroll", updateArrowVisibility);
    }
    // Parallax scrolling effect for the .hero section
    window.addEventListener("scroll", function () {
        var parallax = document.querySelector(".hero");
        if (parallax) {
            var scrollPosition = window.pageYOffset;
            parallax.style.backgroundPositionY = scrollPosition * 0.05 + "px";
        }
    });
});
