
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

for (const info of recievedInformation.news) {
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
                <p class="text" style="text-align: right">${text}</p>
                <div class="bottom-part">
                    ${readMoreLink} ${dateText}
                </div>
            </div>
        </div>
        ` : `
        <div class="topic">
            <div class="text-container"${imageTextValue}>
                <h1 class="text-2" id="${valueId}"> ${title} </h1>
                <p class="text" style="text-align: left">${text}</p>
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


