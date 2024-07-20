document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById("navbar");

    if (navbar) {
        const navHeight = `${navbar.offsetHeight}px`;
        document.documentElement.style.setProperty('--nav-height', navHeight);
        // Dynamically calculates the height of navbar
    }

    const $galleryScroll = $('.gallery-scroll');
    const $galleryContent = $('.gallery-content');
    const $leftArrow = $('#left-arrow');
    const $rightArrow = $('#right-arrow');

    if ($galleryScroll.length && $galleryContent.length && $leftArrow.length && $rightArrow.length) {
        const scrollAmount = 640; // Adjust if needed, measured in pixels, so this is ~35.56rem.
        // Why this specific? Images are set to height 20rem, and they are 16:9 aspect ratio, so this basically is the width of one image. I YAP TOO MUCH HELP

        // Clone items for infinite scroll
        const $items = $galleryContent.children().clone();
        let rightArrowClickCount: number = 0;
        $galleryContent.append($items);

        // REMINDER TO SELF
        // scrollLeftPos is the POSITION of the scroll, default function of .scrollLeft() on a scroll container gives the POSITION of the scroll
        // While user-defined scrollLeft() is the ACTION OF SCROLLING TO THE LEFT AAAAAAAAAAAA

        function updateGalleryPosition() {
            const scrollLeftPos = $galleryScroll.scrollLeft() ?? 0; // use nullish coalescing operator ?? to avoid TypeScript screaming at me
            const contentWidth = $galleryContent.width() ?? 0; // Basically defaults to 0 if null, what a weird operator
            const halfContentWidth = contentWidth / 2;

            if (scrollLeftPos >= halfContentWidth) {
                $galleryScroll.scrollLeft(scrollLeftPos - halfContentWidth);
            } else if (scrollLeftPos <= 0) {
                $galleryScroll.scrollLeft(scrollLeftPos + halfContentWidth);
            }
        }

        function scrollLeft() {
            $galleryScroll.animate({
                scrollLeft: '-=' + scrollAmount
            }, 400, updateGalleryPosition);
        }

        function scrollRight() {
            $galleryScroll.animate({
                scrollLeft: '+=' + scrollAmount
            }, 400, updateGalleryPosition);
        }

        function stopAutoScroll() {
            if (autoScrollInterval) {
                clearInterval(autoScrollInterval);
                autoScrollInterval = null;
            }
        }

        $leftArrow.on('click', scrollLeft).on('click', stopAutoScroll);
        $rightArrow.on('click', scrollRight).on('click', stopAutoScroll);

        // Automatic scrolling with 2-second delay, adjust delay if needed :3
        let autoScrollInterval: number | null = setInterval(scrollRight, 2000);

        // Handle the "jump" when reaching the cloned items
        $galleryScroll.on('scroll', updateGalleryPosition);
    }
});