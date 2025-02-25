
let right_sidebar_text = '';
let main_text = '';

const rightSideBarElement = document.getElementById("right-sidebar-list")
const mainElement = document.getElementById("main")

main_text += '<h1 class="text-1" style="justify-self: center; text-align: center;">History Of Command Schools</h1>'
for (const items of recievedInformation.history) {
    const title = items[0]
    const content = items[1]

    const valueId = title.toLowerCase().replaceAll(" ", '-')

    right_sidebar_text += '<li><a class="right-sidebar-link" href="#' + valueId + '">'+ title + '</a></li>'
    main_text += '<h2 class="text-2" id="' + valueId + '" style="margin-top: 40px; margin-bottom: 20px;">'+ title + ' <a class="text-2-anchor-link" href="#' + valueId + '">#</a> </h2>' + content
}

rightSideBarElement.setHTMLUnsafe(right_sidebar_text)
mainElement.setHTMLUnsafe(main_text)

