// Boorger

const boorgerMenu = document.querySelector('.boorger-menu')
const boorgerBtn = document.querySelector('.boorger-menu-btn')
const menuBg = document.querySelector('.menu-bg')
const closeBtn = document.querySelector('.fa-times')

const closeBoorger = () => {
    menuBg.style.opacity = '0'
    setTimeout(() => {
        menuBg.style.zIndex = '-1'
    }, 100)
    
    boorgerMenu.style.top = '-100vh'
    document.body.style.overflow = ''
}

boorgerBtn.addEventListener('click', () => {
    menuBg.style.zIndex = '2'
    boorgerMenu.style.top = '0'
    setTimeout(() => {
        menuBg.style.opacity = '.6'
    }, 100)
    
    document.body.style.overflow = 'hidden'
})

closeBtn.addEventListener('click', () => {
    closeBoorger()
})

// Scroll
let nav = document.getElementsByTagName('a')

for (let item of nav) {
    item.addEventListener('click', event => {
        event.preventDefault()
        closeBoorger()

        let itemHref = item.getAttribute('href')
        document.querySelector(`${itemHref}`).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    })
}
