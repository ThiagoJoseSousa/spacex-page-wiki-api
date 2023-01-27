/** Shouldn't be oop, there's little state, but disable buttons while requesting. */

/** Await is another version of the .then, but you must advise JS that it will have a promise, using async before func
 * with promises you must handle errors in case the API doesn't returns a proper response, to improve user experience.
 * using try/catch is better than using multiple ifs on the code. 
 * use destructuring too.
 * the promise returns an 'error' property at the surface level when the promise gets not resolved, so we check it with if to throw an error, which gets out of try block and goes to catch/finally(always happen)
 * CORS is an browser rule that doesn't let a different IP than the owner of the data bank acess It. So the server must have a rule to whitelist other origins.
*/
const sectionTitles=document.getElementsByClassName('titles')
const slidesWrapper=document.getElementsByClassName('content')
const watchButton=  document.getElementsByClassName('titles__button');
const slideText = document.getElementsByClassName('slide__text')
const labels= document.getElementsByClassName('bar');
const navigationBar= document.getElementById('navigationBar');

const endPoint= 'https://en.wikipedia.org/w/api.php?'

const parameters= {
    action:'query',
    prop:'extracts',
    format:'json',
    origin:'*',
    exintro:'true',
    titles:'' // titles should take the label data key
}

function openContent(e){
    const sectionNumber=e.target.dataset.section;
    console.log(sectionNumber)
    toggleContentDisplay(sectionNumber)
    console.log(slidesWrapper[sectionNumber].querySelector('[data-slidenum="0"]').dispatchEvent(new Event('click')));
}

async function slideNavClick(e){
    const slideUrl=e.target.dataset.title;
    const slideNum=e.target.dataset.slidenum; //dataset.name should always be lowercase
    parameters.titles=slideUrl;
    clearText(slideNum)
    disableEnableButtons(labels);
    disableEnableButtons(watchButton);
    try {const text=await axios.get(endPoint,{params:parameters}) //await comes into place before the func exec
// use try catch on the promise
    console.log(slideUrl) //await doesnt create another scope as "then!"
    if (text.error) {throw new Error(text.error)} // the object returns an error property, it works even offline, but scope changes.
    // i can put something inside the if though
    displaySlideText({slideNumber:slideNum, text}) }
    catch {
        console.log('error')
    }
    finally {
        disableEnableButtons(labels);
        disableEnableButtons(watchButton);
    }
}

function displaySlideText(slideIdentification){
    const {slideNumber} = slideIdentification;
    const {text}=slideIdentification;
    const pageKey= Object.keys(text.data.query.pages);
    const preparedText=text.data.query.pages[pageKey].extract;

    slideText[parseInt(slideNumber,'10')].innerHTML =preparedText;

}

function toggleContentDisplay(sectionNumber) {
    slidesWrapper[sectionNumber].classList.toggle('hidden')
    watchButton[sectionNumber].classList.toggle('close')
    sectionTitles[sectionNumber].classList.toggle('hidden')
    navigationBar.classList.toggle('hidden')
    slidesWrapper[sectionNumber].parentElement.classList.toggle('hidden')
}

function addBtnHandler(){
    for (let i=0; i<watchButton.length; i++){
        watchButton[i].addEventListener('click',openContent)
    }
}

function addSlideHandler(){
    for(let i =0; i<labels.length; i++){
        labels[i].addEventListener('click',slideNavClick)
    }
}

function clearText(slideNumber){
    slideText[parseInt(slideNumber,'10')].innerHTML ='';
}

function disableEnableButtons(buttons){
    for (let i=0; i<buttons.length; i++){
        buttons[i].classList.toggle('disabled');
    }
}

addBtnHandler()
addSlideHandler();
//maybe add an animation for when the content shows up/the content is cleared/text apperas, like a circle that goes in/out of the slide btn?
//disable all other labes while the request is being fetched, or an user could make thousands of requests
// put try/catch too. 
// XML is just an object, like an API to make requests but w/o importing.
// AJAX is jquery that makes html requests
//refactor css to use functions + shorten props as background-color to just background and html to have divided sections
//I can follow Clean Code 100% in JS , but commenting in HTML/CSS is considered good practice.