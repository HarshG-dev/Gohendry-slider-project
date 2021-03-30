import { expect, test } from "@jest/globals";
import { Slider } from "../script/slider-module.js";

//basic dom for testing
document.body.innerHTML = 
'<main id="main">' +
'<div id="slider-one">' +
'<div id="mySlide1" style="display:none;">' + '<p>Card 1</p></div>' +
'<div id="mySlide1" style="display:none;">' + '<p>Card 2</p></div>' +
'<div id="mySlide1" style="display:none;">' + '<p>Card 3</p></div>' +
'<div id="mySlide1" style="display:none;">' + '<p>Card 4</p></div>' +
'<div id="mySlide1" style="display:none;">' + '<p>Card 5</p></div>' +
'<div id="mySlide1" style="display:none;">' + '<p>Card 6</p></div>' +
'<div id="mySlide1" style="display:none;">' + '<p>Card 7</p></div>' +
'<div id="mySlide1" style="display:none;">' + '<p>Card 8</p></div>' +
'</div>' +
'<div>' +
'   <a class="prev-one">&#10094;</a>' +
'   <a class="next-one">&#10095;</a>' +
'</div>' +
'</main>';

test("Testing for slider object creation", () => {
    let mySlider1 = new Slider("#mySlide1",3);
    expect(mySlider1.slides.length).toBe(8);
    expect(mySlider1.itemsToShow).toBe(3);
});

test("Testing for slider functionality", () => {
    let mySlider1 = new Slider("#mySlide1",3);
    let prevButton = document.querySelector(".prev-one");
    let nextButton = document.querySelector(".next-one");
    mySlider1.registerNav(prevButton,nextButton);
    expect(mySlider1.currentSlide).toBe(0);
    //test for slider setup for 1st frame
    mySlider1.init(0);
    expect(mySlider1.currentSlide).toBe(2);
    //test for next button
    nextButton.click();
    expect(mySlider1.currentSlide).toBe(5);
    nextButton.click();
    expect(mySlider1.currentSlide).toBe(7);
    // test for prev button
    prevButton.click();
    expect(mySlider1.currentSlide).toBe(4);
    prevButton.click();
    expect(mySlider1.currentSlide).toBe(2);
});
