class Carousel {

    constructor (element, options= {}){
        this.element = element
        this.options = Object.assign({}, {
            slidesToScroll: 4,
            slidesVisible: 4
        }, options)
    }
}

document.addEventListener('DOMContentLoaded', function () {
    
    
    new Carousel(document.querySelector('#carrousel'), {
        slidesToScroll: 4,
        slidesVisible: 4
    
    })
})
