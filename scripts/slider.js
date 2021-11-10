//Control position

const sliderControls = document.querySelectorAll('.arrows')
const slidesContainer = document.querySelectorAll('.slides-container')

let changeWidth = 1200


const controlsPosition = (control, container) => {
    let arrow = document.querySelector('.arrow-left')

    control.style.top = `${(container.offsetHeight / 2) - (arrow.offsetHeight / 2)}px`

    if (window.innerWidth < changeWidth) {
        control.style.width = `${container.offsetWidth - (15 * 2)}px`
    } else if (window.innerWidth >= changeWidth) {
        control.style.width = `${container.offsetWidth + (arrow.offsetWidth * 2) + (60 * 2)}px`
    }
}

controlsPosition(sliderControls[0], slidesContainer[0])
controlsPosition(sliderControls[1], slidesContainer[1])


window.addEventListener('resize', () => {
    controlsPosition(sliderControls[0], slidesContainer[0])
})

window.addEventListener('resize', () => {
    controlsPosition(sliderControls[1], slidesContainer[1])
})

//Control

const firstArrows = sliderControls[0]
const secondArrows = sliderControls[1]
const firstSlides = slidesContainer[0].querySelectorAll('.slide')
const secondSlides = slidesContainer[1].querySelectorAll('.slide')
const sliderPoints = document.querySelector('.slider-points')
const points = document.querySelectorAll('.point')

let count = 0
let countForActive = 3

const sliderBorders = (controls) => {
    let c = controls.querySelectorAll('.arrow')
    if (countForActive == firstSlides.length - 1) {
        c[1].style.opacity = 0
        c[1].style.zIndex = -1
    } else if (countForActive == 0) {
        c[0].style.opacity = 0
        c[0].style.zIndex = -1
    } else {
        c[0].style.opacity = 1
        c[1].style.opacity = 1
        c[0].style.zIndex = 0
        c[1].style.zIndex = 0
    }
}

const changePoint = () => {
    sliderPoints.addEventListener('click', event => {
        if (event.target.classList.contains('point')) {
            points.forEach((item, ind) => {
                item.classList.remove('active-point')
                if (event.target == item) {
                    item.classList.add('active-point')

                    if (ind < countForActive) {
                        for (let i = countForActive; i > ind; i--) {
                            moveSlide('Left')
                        }
                    } else if (ind > countForActive) {
                        for (let i = countForActive; i < ind; i++) {
                            moveSlide('Right')
                        }
                    }
                }
            })
        }
    })
}

const moveSlide = (direction, slider) => {
    let margin = parseInt(window.getComputedStyle(firstSlides[0]).getPropertyValue('margin-right'))

    if (direction == 'Left') {
        count++
        countForActive--

        firstSlides.forEach((item, ind) => {
            item.style.transform = `translateX(${count * (item.offsetWidth + (margin * 2))}px)`

            item.classList.remove('active-slide')
            ind == countForActive ? item.classList.add('active-slide') : false
        })
        changePoint()

    } else if (direction == 'Right') {
        count--
        countForActive++

        firstSlides.forEach((item, ind) => {
            item.style.transform = `translateX(${count * (item.offsetWidth + (margin * 2))}px)`

            item.classList.remove('active-slide')
            ind == countForActive ? item.classList.add('active-slide') : false
        })
        changePoint()

    } else if (direction == 'Res') {
        firstSlides.forEach(item => {
            item.style.transform = `translateX(${count * (item.offsetWidth + (margin * 2))}px)`
        })
    }

    points.forEach((item, ind) => {
        ind == countForActive ? item.classList.add('active-point') : item.classList.remove('active-point')
    })

    sliderBorders(firstArrows)

}

firstArrows.addEventListener('click', event => {
    if (event.target.classList.contains('arrow-left') ||
        event.target.classList.contains('left')) {

        moveSlide('Left')
    } else if (event.target.classList.contains('arrow-right') ||
        event.target.classList.contains('right')) {

        moveSlide('Right')
    }

    console.log(this)
})

window.addEventListener('resize', () => {
    moveSlide('Res')
})

changePoint()
