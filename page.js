
const burger= document.getElementById('burger-menu');
const burgerHidden=document.getElementById('burger--hidden');
const burgerWrapper = document.getElementById('burger__wrapper--hidden')

burger.addEventListener('click', ()=>{
    burger.classList.toggle('clicked')
    console.log(burgerHidden)
    if(burgerHidden.id==='burger--hidden') {
        burgerHidden.setAttribute('id','burger')
        burgerWrapper.setAttribute('id', 'burger__wrapper')
    } else {
        burgerHidden.setAttribute('id','burger--hidden')
        burgerWrapper.setAttribute('id', 'burger__wrapper--hidden')
    }
})

/* header show/disappear */

let lastScrollTop=0;
window.addEventListener("scroll",function (){
    let scrollTop= window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop> lastScrollTop){
        navigationBar.style.top="-100px";
    } else {
        navigationBar.style.top="0";
    }
    lastScrollTop=scrollTop;
})