function Slider(sliderName, itemsToShow) {
    this.slides = document.querySelectorAll(sliderName);
    this.itemsToShow = itemsToShow;
    this.currentSlide = 0;
}

Slider.prototype.init = function(startIndex) {
    console.log("itemsToShow ",this.itemsToShow," length ",this.slides.length);

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
    console.log("currentSlide", this.currentSlide);
}

Slider.prototype.registerNav = function(prevArrow, nextArrow) {
    prevArrow.addEventListener("click", () => { this.prev(); });
    nextArrow.addEventListener("click", () => { this.next(); });
}

Slider.prototype.next = function(){
    this.currentSlide++;
    this.init(this.currentSlide);
}

Slider.prototype.prev = function() {
    this.currentSlide = this.currentSlide - 2 * (this.itemsToShow) + 1;
    if (this.currentSlide < 0)
        this.currentSlide = 0;
    this.init(this.currentSlide);
}

export { Slider };