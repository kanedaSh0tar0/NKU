document.onreadystatechange = function () {

    const sliderControls = document.querySelectorAll('.arrows')
    const slidesContainer = document.querySelectorAll('.slides-container')

    const firstSlides = slidesContainer[0].querySelectorAll('.slide')
    const secondSlides = slidesContainer[1].querySelectorAll('.slide')

    const firstArrows = sliderControls[0]
    const secondArrows = sliderControls[1]
    const sliderPoints = document.querySelector('.slider-points')
    const points = document.querySelectorAll('.point')
    const info = document.querySelectorAll('.info')

    let changeWidth = 1200
    let countForActive1 = Math.round((firstSlides.length / 2) - 1)
    let countForActive2 = Math.round((secondSlides.length / 2) - 1)
    let margin = parseInt(window.getComputedStyle(firstSlides[0]).marginRight)

    function controlsPosition(control, container) {
        let arrow = document.querySelector('.arrow-left')

        if (window.innerWidth > 425) {
            control.style.top = `${(container.offsetHeight / 2) - (arrow.offsetHeight / 2)}px`

            if (window.innerWidth < changeWidth) {
                control.style.width = `${container.offsetWidth - (15 * 2)}px`
            } else if (window.innerWidth >= changeWidth) {
                control.style.width = `${container.offsetWidth + (arrow.offsetWidth * 2) + (60 * 2)}px`
            }
        } else if (window.innerWidth <= 425) {
            control.style.top = 'auto'
            control.style.width = 'auto'
        }
    }

    function centerSlide(slider, active, mar = 0) {
        slider.forEach((item, ind) => {
            if (ind == active) {
                item.classList.add('active-slide')
            }

            item.style.transform = `translateX(-${active * (item.offsetWidth + (mar * 2))}px)`
        })
    }

    function sliderBordersForArrows() {
        let c = firstArrows.querySelectorAll('.arrow')
        if (countForActive1 == firstSlides.length - 1) {
            c[1].style.opacity = 0
            c[1].style.zIndex = -1
            c[1].style.cursor = 'auto'
        } else if (countForActive1 == 0) {
            c[0].style.opacity = 0
            c[0].style.zIndex = -1
            c[0].style.cursor = 'auto'
        } else {
            c[0].style.opacity = 1
            c[1].style.opacity = 1
            c[0].style.zIndex = 0
            c[1].style.zIndex = 0
            c[0].style.cursor = 'pointer'
            c[1].style.cursor = 'pointer'
        }
    }

    function changePoint() {
        if (window.innerWidth > 425) {
            sliderPoints.addEventListener('click', event => {
                if (event.target.classList.contains('point')) {
                    points.forEach((item, ind) => {
                        item.classList.remove('active-point')
                        if (event.target == item) {
                            item.classList.add('active-point')

                            if (ind < countForActive1) {
                                for (let i = countForActive1; i > ind; i--) {
                                    moveSlide('Left')
                                }
                            } else if (ind > countForActive1) {
                                for (let i = countForActive1; i < ind; i++) {
                                    moveSlide('Right')
                                }
                            }
                        }
                    })
                }
            })
        } else false
    }

    function moveSlide(direction) {
        const move = () => {
            firstSlides.forEach((item, ind) => {
                item.style.transition = 'transform .3s linear, opacity .5s linear'
                item.style.transform = `translateX(-${countForActive1 * (item.offsetWidth + (margin * 2))}px)`

                item.classList.remove('active-slide')
                ind == countForActive1 ? item.classList.add('active-slide') : false
            })
        }

        const checkSliderBorder = () => {
            if (countForActive1 < 0) {
                countForActive1 = 0
            } else if (countForActive1 > firstSlides.length - 1) {
                countForActive1 = firstSlides.length - 1
            }
        }

        if (direction == 'Left') {
            countForActive1--
            checkSliderBorder()
            move()
        } else if (direction == 'Right') {
            countForActive1++
            checkSliderBorder()
            move()
        } else if (direction == 'Res') {
            move()
        }

        points.forEach((item, ind) => {
            ind == countForActive1 ? item.classList.add('active-point') : item.classList.remove('active-point')
        })

        setTimeout(() => {
            firstSlides.forEach(item => {
                item.style.transition = 'transform 0s linear, opacity .5s linear'
            })
        }, 100)

        sliderBordersForArrows()
    }

    function moveProjectSlide(direction) {
        const move = () => {
            secondSlides.forEach((item, ind) => {
                item.style.transition = 'transform .3s linear, opacity .5s linear'
                item.style.transform = `translateX(-${countForActive2 * (item.offsetWidth)}px)`

                item.classList.remove('active-slide')
                ind == countForActive2 ? item.classList.add('active-slide') : false
            })
        }

        const checkSliderBorder = () => {
            if (countForActive2 < 0) {
                countForActive2 = secondSlides.length - 1
            } else if (countForActive2 > secondSlides.length - 1) {
                countForActive2 = 0
            }
        }

        if (direction == 'Left') {
            countForActive2--

            checkSliderBorder()
            move()
        } else if (direction == 'Right') {
            countForActive2++

            checkSliderBorder()
            move()
        }
    }

    function showInfo() {
        info.forEach((item, ind) => {
            item.style.opacity = 0

            setTimeout(() => {
                item.classList.remove('info-active')
            }, 250)

            setTimeout(() => {
                if (ind == countForActive2) {
                    item.classList.add('info-active')
                    setTimeout(() => {
                        item.style.opacity = 1
                    }, 300)
                }
            }, 250)
        })
    }

    firstArrows.addEventListener('click', event => {
        if (event.target.classList.contains('arrow-left') ||
            event.target.classList.contains('left')) {

            moveSlide('Left')
        } else if (event.target.classList.contains('arrow-right') ||
            event.target.classList.contains('right')) {

            moveSlide('Right')
        }
    })

    secondArrows.addEventListener('click', event => {
        if (event.target.classList.contains('arrow-left') ||
            event.target.classList.contains('left')) {

            moveProjectSlide('Left')
            showInfo()
        } else if (event.target.classList.contains('arrow-right') ||
            event.target.classList.contains('right')) {

            moveProjectSlide('Right')
            showInfo()
        }
    })

    controlsPosition(sliderControls[0], firstSlides[countForActive1])
    controlsPosition(sliderControls[1], secondSlides[countForActive2])
    centerSlide(firstSlides, countForActive1, margin)
    centerSlide(secondSlides, countForActive2)

    window.addEventListener('resize', () => {
        margin = parseInt(window.getComputedStyle(firstSlides[0]).marginRight)

        controlsPosition(sliderControls[0], slidesContainer[0])
        controlsPosition(sliderControls[1], slidesContainer[1])
        centerSlide(firstSlides, countForActive1, margin)
        centerSlide(secondSlides, countForActive2)
    })

    changePoint()
    showInfo()

    // Swipe

    slidesContainer[0].addEventListener('touchstart', handleTouchStart)
    slidesContainer[0].addEventListener('touchmove', touchmove)
    slidesContainer[0].addEventListener('touchend', touchEnd)

    slidesContainer[0].addEventListener('mouseenter', () => {
        slidesContainer[0].style.cursor = 'grab'
    })

    slidesContainer[0].addEventListener('mousedown', event => {
        grabbing = true
        slidesContainer[0].style.cursor = 'grabbing'
        x = event.clientX
    })

    window.addEventListener('mouseup', () => {
        grabbing = false
    })

    slidesContainer[0].addEventListener('mouseup', () => {
        slidesContainer[0].style.cursor = 'grab'

        if (xMove > 200) {
            moveSlide('Left')
        } else if (xMove < -200) {
            moveSlide('Right')
        } else moveSlide('Res')
    })

    slidesContainer[0].addEventListener('mousemove', event => {
        if (!grabbing) return
        event.preventDefault()
        xMove = event.clientX - x

        firstSlides.forEach(item => {
            item.style.transform = `translateX(-${countForActive1 * (item.offsetWidth + (margin * 2)) - xMove}px)`
            countForActive1 <= 0 ?
                item.style.transform = `translateX(${countForActive1 * (item.offsetWidth + (margin * 2)) + xMove}px)`
                : false
        })
    })

    let grabbing = false
    let x = null
    let y = null
    let xMove = null
    let yMove = null

    function handleTouchStart(event) {
        x = event.touches[0].clientX
        y = event.touches[0].clientY
    }

    function touchmove(event) {
        xMove = event.touches[0].clientX - x
        yMove = event.touches[0].clientY - y

        firstSlides.forEach(item => {
            item.style.transform = `translateX(-${countForActive1 * (item.offsetWidth + (margin * 2)) - xMove}px)`
            countForActive1 <= 0 ?
                item.style.transform = `translateX(${countForActive1 * (item.offsetWidth + (margin * 2)) + xMove}px)`
                : false
        })
    }

    function touchEnd() {
        if (Math.abs(xMove) > Math.abs(yMove)) {
            if (xMove > 100) {
                moveSlide('Left')
            } else if (xMove < -100) {
                moveSlide('Right')
            } else moveSlide('Res')
        } else moveSlide('Res')
    }
};
