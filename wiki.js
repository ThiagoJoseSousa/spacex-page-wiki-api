/*what data to get?*/
/* sliders: (I can search for articles, but # sections doesnt work. So I must go for articles) */
/*5, description, list of launches, description/list of rocket boosters, list of prototypes, first-stage landing tests, async and await are JS builtin funcs*/

/* axios/no npm install https://www.youtube.com/watch?v=qM4G1Ai2ZpE&ab_channel=Academind */
const s1=document.getElementsByClassName('s1 text')[0];
const slideText=  document.getElementsByClassName('slide__text');

console.log(s1, 's1')
console.log(slideText, 'sections__info')

const sectionA= {
    slide1: function (){
        axios.get('https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Global_Positioning_System&format=json&origin=*&exintro=true')
        .then((response) => {
            const pageKey= Object.keys(response.data.query.pages);
            console.log(slideText[0].getElementsByClassName('text') + ' the element')
            slideText[0].innerHTML = response.data.query.pages[pageKey].extract;
            console.log(response.data.query.pages[pageKey].extract.indexOf('History'), 'index of')
        })
    },
    slide2: function (){
        axios.get('https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=GPS_Block_III&format=json&origin=*')
        .then((response) => {
            const pageKey= Object.keys(response.data.query.pages);
            let text=response.data.query.pages[pageKey].extract;
            const deleteIndex=text.indexOf('See also');
            text= text.slice(0,deleteIndex)
            console.log(slideText[1].getElementsByClassName('text') + ' the element')
            slideText[1].innerHTML = text;
        })
    },
    slide3:function (){
        console.log('Satellite_navigation')
    }

}

sectionA.slide1()
const watchButton=  document.getElementsByClassName('titles__button');
watchButton[0].addEventListener('click', toggleSlide)

const slidesWrapper=document.getElementsByClassName('content')
const sectionTitles=document.getElementsByClassName('titles')
const navigationBar=document.getElementsByClassName('header')[0]
// this toggle shouldn't be needed + the api request should happen in watch button 

function toggleSlide() {
slidesWrapper[0].classList.toggle('hidden')
watchButton[0].classList.toggle('close')
sectionTitles[0].classList.toggle('hidden')
navigationBar.classList.toggle('hidden')
}

const slidesNavigation=document.getElementsByClassName('slides__navigation');
// slides navigation has childs. For each child ele of a slidenavigation tab, add listener to request api info
// I want this to happen only 1 time though, no need for multiple requests of the same btn. 
// I should make a variable for each request, and a general func that makes requests and stores the response in an object as var.
// What changes is the url/slide num at the request func
// I must have a general request func, a func that stores the response, a func that checks if the response is already there, knowing the slide we're in is easy,
// just check the label numbers. We must check which section contains the watch button with a func. 