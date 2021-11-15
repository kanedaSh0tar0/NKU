const popupBtn = document.querySelectorAll('.popup-btn')
const body = document.querySelector('body')
const popupArea = document.querySelector('.popup-area')
const popupContent = document.querySelector('.popup-content')
const popupClose = document.querySelector('.popup-close')

popupBtn.forEach(item => {
    item.addEventListener('click', () => {
        popupArea.style.display = 'flex'
        setTimeout(() => {
            popupArea.style.opacity = 1
            popupContent.style.left = 0
            body.style.overflow = 'hidden'
        }, 100)

    })
})

popupArea.addEventListener('click', event => {
    if (event.target.classList.contains('popup-area') ||
        event.target.classList.contains('popup-close')) {
            popupContent.style.left = '100vw'
            popupArea.style.opacity = 0
            body.style.overflow = 'auto'
        
            setTimeout(() => {
                popupArea.style.display = 'none'
                popupContent.style.left = '-100vw'
            }, 300)
    }
})
