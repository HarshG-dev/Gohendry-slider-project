import { Slider } from "./slider-module.js";
import { getDataFromDB } from "./backendDB.js";

const slider1 = document.getElementById("slider-one");
const slider2 = document.getElementById("slider-two");

// Slider control buttons/arrows
const nextArrow1 = document.querySelector(".next-one");
const prevArrow1 = document.querySelector(".prev-one");
const nextArrow2 = document.querySelector(".next-two");
const prevArrow2 = document.querySelector(".prev-two");

let mySlider1;
let mySlider2;

function resize() {
let cardBlock;
    if (window.innerWidth <= 500) { 
        cardBlock = 1;
    } else if (window.innerWidth <= 800) {
        cardBlock = 2;
    } else {
        cardBlock = 3;
    }

    if(mySlider1.itemsToShow != cardBlock) {
        mySlider1.itemsToShow = cardBlock;
        mySlider2.itemsToShow = cardBlock;
        mySlider1.init(0);
        mySlider2.init(0);
    }
}
window.onresize = resize;

function setupSliders() {    
    if (screen && screen.width <= 500) { 
        mySlider1 = new Slider("#mySlide1",1);
        mySlider2 = new Slider("#mySlide2",1);
    } else if (screen && screen.width <= 800) {
        mySlider1 = new Slider("#mySlide1",2);
        mySlider2 = new Slider("#mySlide2",2);
    } else {
        mySlider1 = new Slider("#mySlide1",3);
        mySlider2 = new Slider("#mySlide2",3);
    }
    mySlider1.init(0);
    mySlider2.init(0);
    mySlider1.registerNav(prevArrow1,nextArrow1);
    mySlider2.registerNav(prevArrow2,nextArrow2);
}

function setupPage(data) {
    let newCard;
    data.cards.forEach((element, index)=> {   
        /* first 6 cards in slider 1*/
        if (index < 6 ) { 
            newCard = createCardElements("mySlide1",element.title,element.subtitle,element.text,element.image_url);
            slider1.appendChild(newCard);
        }
        /* last 8 cards in sliders 2*/
        if(index >= data.cards.length - 8) {
            newCard = createCardElements("mySlide2",element.title,element.subtitle,element.text,element.image_url);
            slider2.appendChild(newCard);
        }     
    });
    setupSliders();
}
function setupPageFail(error) {
    console.log(error);
    document.querySelector(".warning").innerHTML = "Data is still loading, try again...";
}

getDataFromDB(setupPage,setupPageFail);

function createCardElements(cardID, title, subtitle, text, imageURL) {
    let cardInner = '<img class="slider__image"  src="' + imageURL + '" alt="' +  title + '"/>' + 
                    '<div class="slider__content">' +
                        '<header class="content__header">' +
                            '<h2 class="title">' + title + '</h2>' +
                            '<h3 class="sub-title">' + subtitle + '</h3>' +
                        '</header>' +
                        '<p class="text">' + text + '</p>' +
                    '</div>' +
                    '<a class="learn-more" href="https://www.gohenry.com/uk/" target="_blank">Learn more</a>';
    let card = document.createElement('div');
    card.id = cardID;
    card.classList.add("slider__block","fade");
    card.innerHTML = cardInner;
    return card;
}
