var navbar = document.getElementById("navbar");
if (navbar) {
    document.documentElement.style.setProperty('--nav-height', navbar.offsetHeight.toString());
}
$(function () {
    var $galleryScroll = $('.gallery-scroll');
    var $leftArrow = $('#left-arrow');
    var $rightArrow = $('#right-arrow');
    if ($galleryScroll.length && $leftArrow.length && $rightArrow.length) {
        var scrollAmount_1 = 500; // Adjust this value as needed
        // Function to update arrow visibility
        function updateArrowVisibility() {
            var _a;
            var currentScrollLeft = (_a = $galleryScroll.scrollLeft()) !== null && _a !== void 0 ? _a : 0;
            var scrollWidth = $galleryScroll[0].scrollWidth; // Total scrollable width
            var clientWidth = $galleryScroll[0].clientWidth; // Visible width
            // Show/hide left arrow
            currentScrollLeft <= 0 ? $leftArrow.addClass('hidden') : $leftArrow.removeClass('hidden');
            // Show/hide right arrow
            currentScrollLeft + clientWidth >= scrollWidth ? $rightArrow.addClass('hidden') : $rightArrow.removeClass('hidden');
        }
        $leftArrow.on('click', function () {
            var _a;
            var currentScrollLeft = (_a = $galleryScroll.scrollLeft()) !== null && _a !== void 0 ? _a : 0; // Use nullish coalescing operator
            $galleryScroll.animate({
                scrollLeft: currentScrollLeft - scrollAmount_1
            }, 400, updateArrowVisibility); // Update visibility after animation
        });
        $rightArrow.on('click', function () {
            var _a;
            var currentScrollLeft = (_a = $galleryScroll.scrollLeft()) !== null && _a !== void 0 ? _a : 0; // Use nullish coalescing operator
            $galleryScroll.animate({
                scrollLeft: currentScrollLeft + scrollAmount_1
            }, 400, updateArrowVisibility); // Update visibility after animation
        });
        // Update visibility on scroll
        $galleryScroll.on('scroll', updateArrowVisibility);
    }
});
