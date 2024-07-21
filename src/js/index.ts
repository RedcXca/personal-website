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
        $galleryContent.append($items);

        let autoScrollInterval: number | null = null;

        function updateGalleryPosition() {
            const scrollLeft = $galleryScroll.scrollLeft() ?? 0; // use nullish coalescing operator ?? to avoid TypeScript screaming at me
            const contentWidth = $galleryContent.width() ?? 0;
            const halfContentWidth = contentWidth / 2;

            if (scrollLeft >= halfContentWidth) {
                $galleryScroll.scrollLeft(scrollLeft - halfContentWidth);
            } else if (scrollLeft <= 0) {
                $galleryScroll.scrollLeft(scrollLeft + halfContentWidth);
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

        // Start automatic scrolling
        function startAutoScroll() {
            // Use an arrow function inside setInterval to maintain context
            autoScrollInterval = setInterval(() => {
                $galleryScroll.animate({
                    scrollLeft: '+=' + scrollAmount
                }, 400, updateGalleryPosition);
            }, 5000);
        }

        startAutoScroll();

        // Handle the "jump" when reaching the cloned items
        $galleryScroll.on('scroll', updateGalleryPosition);
    }
});