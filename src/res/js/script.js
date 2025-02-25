
function getData() {
    const data = JSON.parse(localStorage.getItem('sharedData'));
    return data;
}

const recievedInformation = getData()
const footerTag = recievedInformation.footerTag

const body = document.documentElement.getElementsByTagName("body")[0]

body.setHTMLUnsafe(body.innerHTML + footerTag)

document.addEventListener("DOMContentLoaded", function () {
    // Loops through all occurences of image-container and wraps them in whatever I want (this is the only HTML you write)
    for (const imageContainer of document.getElementsByClassName('image-container')) {
        
        // Wrap the image container in a carousel wrapper (added via JS)
        const carouselWrapper = document.createElement('div');
        carouselWrapper.classList.add('carousel-wrapper');
        imageContainer.parentNode.insertBefore(carouselWrapper, imageContainer);
        carouselWrapper.appendChild(imageContainer);

        // Wrap each image in a slide container (added via JS)
        const images = Array.from(imageContainer.querySelectorAll('img'));
        images.forEach(img => {
            const slide = document.createElement('div');
            slide.classList.add('slide');
            // Insert the slide before the image, then move the image into the slide
            imageContainer.insertBefore(slide, img);
            slide.appendChild(img);
        });

        // Create navigation buttons (added via JS)
        const prevButton = document.createElement('button');
        prevButton.classList.add('carousel-button', 'prev-button');
        prevButton.innerHTML = '&#9664;'; // left arrow

        const nextButton = document.createElement('button');
        nextButton.classList.add('carousel-button', 'next-button');
        nextButton.innerHTML = '&#9654;'; // right arrow

        carouselWrapper.appendChild(prevButton);
        carouselWrapper.appendChild(nextButton);

        // Set up carousel functionality
        const slides = imageContainer.querySelectorAll('.slide');
        const totalSlides = slides.length;
        let currentIndex = 0;

        function updateCarousel() {
            const wrapperWidth = carouselWrapper.clientWidth;
            // Slide the container to show the current slide
            imageContainer.style.transform = `translateX(-${currentIndex * wrapperWidth}px)`;
            // Disable buttons at the boundaries
            prevButton.disabled = (currentIndex === 0);
            nextButton.disabled = (currentIndex === totalSlides - 1);
        }

        prevButton.addEventListener('click', function () {
            if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
            }
        });

        nextButton.addEventListener('click', function () {
            if (currentIndex < totalSlides - 1) {
            currentIndex++;
            updateCarousel();
            }
        });

        // Update carousel on window resize to maintain correct slide positioning
        window.addEventListener('resize', updateCarousel);

        // Initialize carousel
        updateCarousel();
    }
});

