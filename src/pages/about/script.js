
const mainElement = document.getElementById("text-body")
const rightSideBarList = document.getElementById("right-sidebar-list")

let flip = false

let body_text = ''
let imageTextValue = ''

let count = 0
let valueId = ''
let right_sidebar_text = ''
let textOrientation = ''

for (const info of recievedInformation.about) {
    const title  = info[0]
    const text = info[1]
    const imagePaths = info[2]
    const readMorePathInfo = info[3]
    
    imageDiv = ''
    imageTextValue = 'style="width: 80%; place-self: center;"'
    
    if (imagePaths.length) {
        imageDiv = '<div class="image-container">'
        for (const path of imagePaths) {
            imageDiv += '<img src="../../res/images/about-images/' + path + '" alt="' + path + '">'
        }
        imageDiv += '</div>'

        imageTextValue = ''
    }

    readMoreLink = readMorePathInfo.length ? '<a class="link-button" style="justify-self: ' + (flip ? 'left' : 'right') + '" href="'+ readMorePathInfo +'">Read Full Source</a>' : ''
    textOrientation = flip ? "right" : "left"

    count += 1
    valueId = count.toString() + '-' + title.replaceAll(' ', '-') + '-' + count.toString()
    right_sidebar_text += '<li><a class="right-sidebar-link" href="#' + valueId + '">'+ title + '</a></li>'
    
    body_text += flip ? `
        <div class="topic">
            ${imageDiv}
            <div class="text-container"${imageTextValue}>
                <h1 class="text-2" style="text-align: ${textOrientation}" id="${valueId}">${title}</h1>
                <p class="text" style="text-align: ${textOrientation}">${text}</p>
                <div class="bottom-part"> ${readMoreLink}</div>
            </div>
        </div>
        ` : `
        <div class="topic">
            <div class="text-container"${imageTextValue}>
                <h1 class="text-2" style="text-align: ${textOrientation}" id="${valueId}">${title}</h1>
                <p class="text" style="text-align: ${textOrientation}">${text}</p>
                <div class="bottom-part"> ${readMoreLink}</div>
            </div>
            ${imageDiv}
        </div>
        `

    flip = !flip
}

mainElement.setHTMLUnsafe(body_text)
rightSideBarList.setHTMLUnsafe(right_sidebar_text)



