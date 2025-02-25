
const pageName = "History"

function getData() {
    const data = JSON.parse(localStorage.getItem('sharedData'));
    return data;
}

function init () {
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
            const images = imageContainer.querySelectorAll('img');
            const totalImages = images.length;
            let currentIndex = 0;

            function updateCarousel() {
            const wrapperWidth = carouselWrapper.clientWidth;
            // Shift the container to show the current image
            imageContainer.style.transform = `translateX(-${currentIndex * wrapperWidth}px)`;
            // Disable the buttons when at the boundaries
            prevButton.disabled = (currentIndex === 0);
            nextButton.disabled = (currentIndex === totalImages - 1);
            }

            prevButton.addEventListener('click', function () {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
            });

            nextButton.addEventListener('click', function () {
            if (currentIndex < totalImages - 1) {
                currentIndex++;
                updateCarousel();
            }
            });

            // Update carousel on window resize (to account for width changes)
            window.addEventListener('resize', updateCarousel);

            // Initialize carousel
            updateCarousel();
        }
    });
}


let right_sidebar_text;
let main_text;

const rightSideBar = document.getElementById("right-sidebar-list")
const body = document.getElementById("main")

right_sidebar_text = ''
main_text = ''

const recievedInformation = getData()

main_text += '<h1 class="text-1" style="justify-self: center; text-align: center;">History Of Command Schools</h1>'
for (const items of recievedInformation[pageName.toLowerCase()]) {
    const title = items[0]
    const content = items[1]

    const valueId = title.toLowerCase().replaceAll(" ", '-')

    right_sidebar_text += '<li><a class="right-sidebar-link" href="#' + valueId + '">'+ title + '</a></li>'
    main_text += '<h2 class="text-2" id="' + valueId + '" style="margin-top: 40px; margin-bottom: 20px;">'+ title + ' <a class="text-2-anchor-link" href="#' + valueId + '">#</a> </h2>' + content
}

rightSideBar.setHTMLUnsafe(right_sidebar_text)
body.setHTMLUnsafe(main_text)

init()
