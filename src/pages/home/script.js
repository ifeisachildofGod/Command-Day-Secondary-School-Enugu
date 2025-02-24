
const pageName = "Home"

function getData() {
    const data = JSON.parse(localStorage.getItem('sharedData'));
    return data;
}

function init () {
    const footerTag = recievedInformation.footerTag
    
    const body = document.documentElement.getElementsByTagName("body")[0]

    body.setHTMLUnsafe(body.innerHTML + footerTag)
}

const recievedInformation = getData()
init()
