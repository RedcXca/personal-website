document.addEventListener('DOMContentLoaded', function () {
    var navbar = document.getElementById("navbar");
    if (navbar) {
        var navHeight = "".concat(navbar.offsetHeight, "px");
        document.documentElement.style.setProperty('--nav-height', navHeight);
    }
    var $galleryScroll = $('.gallery-scroll');
    var $galleryContent = $('.gallery-content');
    var $leftArrow = $('#left-arrow');
    var $rightArrow = $('#right-arrow');
    if ($galleryScroll.length && $galleryContent.length && $leftArrow.length && $rightArrow.length) {
        var scrollAmount_1 = 500; // Adjust this value as needed
        // Clone items for infinite scroll
        var $items = $galleryContent.children().clone();
        $galleryContent.append($items);
        var autoScrollInterval_1 = null;
        function updateGalleryPosition() {
            var _a, _b;
            var scrollLeft = (_a = $galleryScroll.scrollLeft()) !== null && _a !== void 0 ? _a : 0;
            var contentWidth = (_b = $galleryContent.width()) !== null && _b !== void 0 ? _b : 0;
            var halfContentWidth = contentWidth / 2;
            if (scrollLeft >= halfContentWidth) {
                $galleryScroll.scrollLeft(scrollLeft - halfContentWidth);
            }
            else if (scrollLeft <= 0) {
                $galleryScroll.scrollLeft(scrollLeft + halfContentWidth);
            }
        }
        function scrollLeft() {
            stopAutoScroll();
            $galleryScroll.animate({
                scrollLeft: '-=' + scrollAmount_1
            }, 400, updateGalleryPosition);
        }
        function scrollRight() {
            stopAutoScroll();
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
        $leftArrow.on('click', scrollLeft);
        $rightArrow.on('click', scrollRight);
        // Start automatic scrolling
        function startAutoScroll() {
            autoScrollInterval_1 = setInterval(function () {
                $galleryScroll.animate({
                    scrollLeft: '+=' + scrollAmount_1
                }, 400, updateGalleryPosition);
            }, 5000);
        }
        startAutoScroll();
        // Handle the "jump" when reaching the cloned items
        $galleryScroll.on('scroll', updateGalleryPosition);
    }
});
