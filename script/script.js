/**
* Main script for setting up the main page and slider function
* @author  Harshanie Gomes
*/

import { Slider } from "./slider-module.js";
import { getDataFromDB } from "./backendDB.js";

//Slider div's in dom
const slider1 = document.getElementById("slider-one");
const slider2 = document.getElementById("slider-two");

// Slider control buttons/arrows
const nextArrow1 = document.querySelector(".next-one");
const prevArrow1 = document.querySelector(".prev-one");
const nextArrow2 = document.querySelector(".next-two");
const prevArrow2 = document.querySelector(".prev-two");

let mySlider1;
let mySlider2;

/*
* function for setting up sliders
*  will setup two sliders based on screen width
*/
function setupSliders() {    
    if (screen && screen.width <= 500) {
        //mobile view 
        mySlider1 = new Slider("#mySlide1",1);
        mySlider2 = new Slider("#mySlide2",1);
    } else if (screen && screen.width <= 800) {
        //tab view
        mySlider1 = new Slider("#mySlide1",2);
        mySlider2 = new Slider("#mySlide2",2);
    } else {
        //desktop view
        mySlider1 = new Slider("#mySlide1",3);
        mySlider2 = new Slider("#mySlide2",3);
    }
    //intialise sliders to show 1st frame
    mySlider1.init(0);
    mySlider2.init(0);
    //register arrow buttons
    mySlider1.registerNav(prevArrow1,nextArrow1);
    mySlider2.registerNav(prevArrow2,nextArrow2);
}
/*
* function for setting up page at start when data is available.
* The should be called when data is available backend server
* @param {object} data - data is an object that containes all the cards in an arrary "cards"
*/
function setupPage(data) {
    let newCard;
    data.cards.forEach((element, index)=> {  
        // create dom element for each card, display will be none for them by default
        // Design choice: first 6 cards in slider 1
        if (index < 6 ) { 
            newCard = createCardElements("mySlide1",element.title,element.subtitle,element.text,element.image_url);
            slider1.appendChild(newCard);
        }
        // Design choice: ast 8 cards in sliders 2
        if(index >= data.cards.length - 8) {
            newCard = createCardElements("mySlide2",element.title,element.subtitle,element.text,element.image_url);
            slider2.appendChild(newCard);
        }     
    });
    setupSliders();
}
/*
* function for reporting errors when setting up page at start
* The should be called when data fetch from backend server fails
*/
function setupPageFail(error) {
    console.log(error);
    document.querySelector(".warning").innerHTML = "Data is still loading, try again...";
}

/* function for creating a single card*/
/* @return {dom element} card - dom element for a single card, can later used to insert to a slider 
*/
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

/*
* resize sliders by changing number of cards per screen
*/
function resize() {
    let cardBlock;
    if (window.innerWidth <= 500) {
        //typical mobile screen- 1 card 
        cardBlock = 1;
    } else if (window.innerWidth <= 800) {
        //typical tab screen - 2 cards
        cardBlock = 2;
    } else {
        //full screen - 3 cards
        cardBlock = 3;
    }
    
    if(mySlider1.itemsToShow != cardBlock) {
        mySlider1.itemsToShow = cardBlock;
        mySlider2.itemsToShow = cardBlock;
        mySlider1.init(mySlider1.firstSlideShowing());
        mySlider2.init(mySlider2.firstSlideShowing());
    }
}
//event handler for window resize
window.onresize = resize;

// At start get data from backend to load page, pass the callbacks needed
getDataFromDB(setupPage,setupPageFail);