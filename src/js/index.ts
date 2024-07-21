const navbar = document.getElementById("navbar");

if (navbar) {
    document.documentElement.style.setProperty(
        "--nav-height",
        navbar.offsetHeight.toString()
    );
}

$(() => {
    const $galleryScroll = $(".gallery-scroll");
    const $leftArrow = $("#left-arrow");
    const $rightArrow = $("#right-arrow");

    if ($galleryScroll.length && $leftArrow.length && $rightArrow.length) {
        const scrollAmount = 640; // Adjust this value as needed

        // Function to update arrow visibility
        function updateArrowVisibility() {
            const currentScrollLeft = $galleryScroll.scrollLeft() ?? 0;
            const scrollWidth = $galleryScroll[0].scrollWidth; // Total scrollable width
            const clientWidth = $galleryScroll[0].clientWidth; // Visible width

            // Show/hide left arrow
            currentScrollLeft <= 0
                ? $leftArrow.addClass("hidden")
                : $leftArrow.removeClass("hidden");

            // Show/hide right arrow
            currentScrollLeft + clientWidth >= scrollWidth
                ? $rightArrow.addClass("hidden")
                : $rightArrow.removeClass("hidden");
        }

        $leftArrow.on("click", () => {
            const currentScrollLeft = $galleryScroll.scrollLeft() ?? 0; // Use nullish coalescing operator
            $galleryScroll.animate(
                {
                    scrollLeft: currentScrollLeft - scrollAmount,
                },
                400,
                updateArrowVisibility
            ); // Update visibility after animation
        });

        $rightArrow.on("click", () => {
            const currentScrollLeft = $galleryScroll.scrollLeft() ?? 0; // Use nullish coalescing operator
            $galleryScroll.animate(
                {
                    scrollLeft: currentScrollLeft + scrollAmount,
                },
                400,
                updateArrowVisibility
            ); // Update visibility after animation
        });

        // Update visibility on scroll
        $galleryScroll.on("scroll", updateArrowVisibility);
    }
});
