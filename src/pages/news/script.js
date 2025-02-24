
const pageName = "News"

function getData() {
    const data = JSON.parse(localStorage.getItem('sharedData'));
    return data;
}

function init () {
    const footerTag = recievedInformation.footerTag

    const body = document.documentElement.getElementsByTagName("body")[0]

    body.setHTMLUnsafe(body.innerHTML + footerTag)
}


const mainElement = document.getElementById("text-body")
const rightSideBarList = document.getElementById("right-sidebar-list")

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

let readMoreInfo = []
let flip = false

let body_text = ''
let imageTextValue = ''
let readMoreLink = ''
let dateText = ''

let count = 0
let valueId = ''
let right_sidebar_text = ''
let imageContainer = ""

const recievedInformation = getData()

for (const info of recievedInformation[pageName.toLowerCase()]) {
    const title  = info[0]
    const text = info[1]
    const date = info[2]
    const imagePaths = info[3]
    const readMorePathInfo = info[4]

    const day = date[0]
    const month = months[date[1] - 1]
    const year = date[2].toString()
    
    const dateHTMLText = day +' of '+ month +', '+ year

    readMoreLink = readMorePathInfo.length ? '<a class="link-button" style="justify-self: ' + (flip ? 'left' : 'right') + '" href="'+ readMorePathInfo +'">Read Full Source</a>' : ''
    dateText = '<h3 class="text-3 date-text" style="justify-self: ' + (flip ? 'right' : 'left') + '; text-align: ' + (flip ? 'right' : 'left') + ';">'+ dateHTMLText +'</h3>'
    
    count += 1
    valueId = count.toString() + '-' + title.replaceAll(' ', '-') + '-' + count.toString()
    right_sidebar_text += '<li><a class="right-sidebar-link" title="' + dateHTMLText + '" href="#' + valueId + '">'+ title + '</a></li>'
    
    imageContainer = ''
    imageTextValue = 'style="width: 80%; place-self: center;"'
    
    if (imagePaths.length) {
        imageContainer = '<div class="image-container">'
        for (const path of imagePaths) {
            imageContainer += '<img src="../../res/images/news-images/' + path + '" alt=" '+ path + '">'
        }
        imageContainer += '</div>'
        
        imageTextValue = ''
    }

    body_text += flip ? `
        <div class="topic">
            ${imageContainer}
            <div class="text-container" ${imageTextValue}>
                <h1 class="text-2" id="${valueId}"> ${title} </h1>
                <p class="text">${text}</p>
                <div class="bottom-part">
                    ${readMoreLink} ${dateText}
                </div>
            </div>
        </div>
        ` : `
        <div class="topic">
            <div class="text-container"${imageTextValue}>
                <h1 class="text-2" id="${valueId}"> ${title} </h1>
                <p class="text">${text}</p>
                <div class="bottom-part">
                    ${dateText} ${readMoreLink}
                </div>
            </div>
            ${imageContainer}
        </div>
        `
    
    flip = !flip
}

mainElement.setHTMLUnsafe(body_text)
rightSideBarList.setHTMLUnsafe(right_sidebar_text)

document.addEventListener("DOMContentLoaded", function () {
    // Get the image container (this is the only HTML you write)
    const imageContainer = document.querySelector('.image-container');
    
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
});


init()

