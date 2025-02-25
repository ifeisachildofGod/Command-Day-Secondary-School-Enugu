
const pageName = "Gallery"

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
const body = document.getElementById("text-body")

let count = 0
let valueId = ''

function mainChanged(cA, cB) {
    right_sidebar_text = ''
    main_text = ''
    
    for (const data of recievedInformation[pageName.toLowerCase()]) {
        if (data[0][0] == cA && data[1][0][0] == cB) {
            main_text += '<h1 class="text-1">' + data[0][0] + '<h1> <h3 class="text-3">'+ data[0][1] + '<h3>'
            
            for (const items of data[1][0][1]) {
                count += 1
                valueId = count.toString() + '-' + items[0].toLowerCase().replaceAll(' ', '-') + '-' + count.toString()

                right_sidebar_text += '<li><a class="right-sidebar-link" href="#' + valueId + '">'+ items[0] + '</a></li>'
                main_text += '<h2 class="text-2" id="' + valueId + '" style="margin-top: 40px; margin-bottom: 20px;">'+ items[0] + ' <a class="text-2-anchor-link" href="#' + valueId + '">#</a> </h2>' + items[1]
            }
        }
    }
    
    rightSideBar.setHTMLUnsafe(right_sidebar_text)
    body.setHTMLUnsafe(main_text)
}

const recievedInformation = getData()

let left_sidebar_text = ''

for (const mainInfo of recievedInformation[pageName.toLowerCase()]) {
    left_sidebar_text += '<li class="left-sidebar-section">'
    left_sidebar_text += '<h1 class="left-sidebar-header"><img src="../../res/images/'+ mainInfo[0][2] +'" alt="'+ mainInfo[0][0] +' icon">' + mainInfo[0][0] + '</h1>'
    left_sidebar_text += '<ul class="left-sidebar-sub-list">'
    for (const subInfo of mainInfo[1]) {
        left_sidebar_text += '<li><a class="left-sidebar-link" href="#">' + subInfo[0] + '<!-- The paragraph is only needed in the Javascript not ht e html --!> <p style="display: none">'+ mainInfo[0][0] +'</p></a></li>'
    }
    left_sidebar_text += "</ul>"
    left_sidebar_text += "</li>"
}

const leftSideBar = document.getElementById("left-sidebar-list")
leftSideBar.setHTMLUnsafe(left_sidebar_text)

const leftSideBarButtons = document.getElementsByClassName("left-sidebar-link")

for (let buttonIndex = 0; buttonIndex < leftSideBarButtons.length; buttonIndex++) {
    const button = leftSideBarButtons[buttonIndex];
    
    button.addEventListener("click",
        () => {
            const headingNameElement = button.getElementsByTagName("p")[0]

            const headingName = headingNameElement.getHTML()
            const buttonName = button.getHTML().slice(0, button.getHTML().indexOf("<"))
            
            for (let buttonSubIndex = 0; buttonSubIndex < leftSideBarButtons.length; buttonSubIndex++) {
                const subButton = leftSideBarButtons[buttonSubIndex];

                subButton.style.color = 'rgb(92, 92, 92)'
                subButton.style.backgroundColor = 'transparent'
            }
            
            button.style.color = 'black'
            button.style.backgroundColor = 'rgba(0, 0, 0, 0.1)'

            mainChanged(headingName, buttonName)
        }
    )
}

leftSideBarButtons[0].click()
mainChanged('Getting started', "Introduction")

init()

