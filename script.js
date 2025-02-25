
function getData() {
    const data = JSON.parse(localStorage.getItem('sharedData'));
    return data;
}


const recievedInformation = getData()
const footerTag = recievedInformation.footerTag

const body = document.documentElement.getElementsByTagName("body")[0]

body.setHTMLUnsafe(body.innerHTML + footerTag.replaceAll('../../../', './').replaceAll('../../res', './src/res').replaceAll('../', './src/pages/'))




