
let right_sidebar_text;
let main_text;

const rightSideBar = document.getElementById("right-sidebar-list")
const textBody = document.getElementById("text-body")

let count = 0
let valueId = ''

right_sidebar_text = ''
main_text = ''

for (const data of recievedInformation.gallery) {
    const title =  data[0]
    const sectionInfo =  data[1]
    
    count += 1
    valueId = `${count.toString()}-${title}-${count.toString()}`
    
    right_sidebar_text += '<li><a class="right-sidebar-link" href="#' + valueId + '">'+ title + '</a></li>'
    
    main_text += '<div class="gallery">'
    main_text += `<h1 class="text-1" id="${valueId}">${title}<h1>`
    main_text += '<div class="gallery-pictures">'
    
    for (const info of sectionInfo) {
        const text = info[0]
        const imgPath = info[1]
        const readMorePath = info[2]

        main_text += `
            <div class="gallery-picture">
                <div class="gallery-picture-image-container"><img src="../../res/images/${imgPath}" alt="${title} image"></div>
                <p class="text">${text}</p>
                ${readMorePath.length ? `<a href="${readMorePath}" class="link-button">Read More</a>` : ''}
            </div>
        `

    }
    main_text += '</div> </div>'
}

rightSideBar.setHTMLUnsafe(right_sidebar_text)
textBody.setHTMLUnsafe(main_text)




