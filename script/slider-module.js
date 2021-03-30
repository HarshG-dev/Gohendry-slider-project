/**
* Implementation of basic slider class
* @author  Harshanie Gomes
* Design is as follows for an example slider with 5 cards and showing 2 on screen at a time
* block:display , none:hide
* init(0) - card0(block),card1(block),card2(none),card3(none),card4(none)
* next()  - card0(none),card1(none),card2(block),card3(block),card4(none)
* next()  - card0(none),card1(none),card2(none),card3(block),card4(block)
* prev()  - card0(none),card1(block),card2(block),card3(none),card4(none)
* prev()  - card0(block),card1(block),card2(none),card3(none),card4(none)
*/
class Slider {
    constructor(sliderName, itemsToShow) {
        //For a given slider, its cards elements must all have same Id name 
        this.slides = document.querySelectorAll(sliderName);
        //Number of items to show in one go
        this.itemsToShow = itemsToShow;
        // pointing to the last card element that is being shown
        this.currentSlide = 0;
    }
    /* 
    * Method: init  Initialise slider frame, show items and advance cards
    * @param   {integer} startIndex index in slider frame to display from
    * starting from startIndex ,#itemstoShow will be displayed
    */
    init(startIndex) {
        //console.log("itemsToShow ",this.itemsToShow," length ",this.slides.length);
        let slideIndex = 0;
        if ((startIndex + this.itemsToShow) > this.slides.length)
            startIndex = this.slides.length - this.itemsToShow;
    
        this.slides.forEach((slide) => {
            if (slideIndex >= startIndex && slideIndex < (startIndex + this.itemsToShow)) {
                slide.style.display = "block";
                this.currentSlide = slideIndex;
            }
            else {
                slide.style.display = "none";
            }
            slideIndex++;
        });
        //console.log("currentSlide", this.currentSlide);
    }
    /* 
    * Method: registerNav Attach prev/next navigation buttons to slider
    * @param   {dom element} prevArrow  prev  (left) naviation button
    * @param   {dom element} NextArrow  next  (right) naviation button
    */
    registerNav(prevArrow, nextArrow) {
        prevArrow.addEventListener("click", () => { this.prev(); });
        nextArrow.addEventListener("click", () => { this.next(); });
    }
    /* 
    * Method: next navigation, advances to the right
    */
    next(){
        //advance one card and move to next frame
        this.currentSlide++;
        this.init(this.currentSlide);
    }
    /* 
    * Method: prev navigation, advances to the left
    */
    prev() {
        //go back two frames from currentSlide
        this.currentSlide = this.currentSlide - 2 * (this.itemsToShow) + 1;
        if (this.currentSlide < 0)
            this.currentSlide = 0;
        this.init(this.currentSlide);
    }
}
export { Slider };