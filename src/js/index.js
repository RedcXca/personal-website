document.addEventListener('DOMContentLoaded', function () {
    var navbar = document.getElementById("navbar");
    if (navbar) {
        var navHeight = "".concat(navbar.offsetHeight, "px");
        document.documentElement.style.setProperty('--nav-height', navHeight);
        // Dynamically calculates the height of navbar
    }
    var $galleryScroll = $('.gallery-scroll');
    var $galleryContent = $('.gallery-content');
    var $leftArrow = $('#left-arrow');
    var $rightArrow = $('#right-arrow');
    if ($galleryScroll.length && $galleryContent.length && $leftArrow.length && $rightArrow.length) {
        var scrollAmount_1 = 640; // Adjust if needed, measured in pixels, so this is ~35.56rem.
        // Why this specific? Images are set to height 20rem, and they are 16:9 aspect ratio, so this basically is the width of one image. I YAP TOO MUCH HELP
        // Clone items for infinite scroll
        var $items = $galleryContent.children().clone();
        var rightArrowClickCount = 0;
        $galleryContent.append($items);
        // REMINDER TO SELF
        // scrollLeftPos is the POSITION of the scroll, default function of .scrollLeft() on a scroll container gives the POSITION of the scroll
        // While user-defined scrollLeft() is the ACTION OF SCROLLING TO THE LEFT AAAAAAAAAAAA
        function updateGalleryPosition() {
            var _a, _b;
            var scrollLeftPos = (_a = $galleryScroll.scrollLeft()) !== null && _a !== void 0 ? _a : 0; // use nullish coalescing operator ?? to avoid TypeScript screaming at me
            var contentWidth = (_b = $galleryContent.width()) !== null && _b !== void 0 ? _b : 0; // Basically defaults to 0 if null, what a weird operator
            var halfContentWidth = contentWidth / 2;
            if (scrollLeftPos >= halfContentWidth) {
                $galleryScroll.scrollLeft(scrollLeftPos - halfContentWidth);
            }
            else if (scrollLeftPos <= 0) {
                $galleryScroll.scrollLeft(scrollLeftPos + halfContentWidth);
            }
        }
        function scrollLeft() {
            $galleryScroll.animate({
                scrollLeft: '-=' + scrollAmount_1
            }, 400, updateGalleryPosition);
        }
        function scrollRight() {
            $galleryScroll.animate({
                scrollLeft: '+=' + scrollAmount_1
            }, 400, updateGalleryPosition);
        }
        function stopAutoScroll() {
            if (autoScrollInterval_1) {
                clearInterval(autoScrollInterval_1);
                autoScrollInterval_1 = null;
            }
        }
        $leftArrow.on('click', scrollLeft).on('click', stopAutoScroll);
        $rightArrow.on('click', scrollRight).on('click', stopAutoScroll);
        // Automatic scrolling with 2-second delay, adjust delay if needed :3
        var autoScrollInterval_1 = setInterval(scrollRight, 2000);
        // Handle the "jump" when reaching the cloned items
        $galleryScroll.on('scroll', updateGalleryPosition);
    }
});
