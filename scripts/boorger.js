const boorgerMenu = document.querySelector('.boorger-menu')
    const boorgerBtn = document.querySelector('.boorger-menu-btn')
    const menuBg = document.querySelector('.menu-bg')
    const closeBtn = document.querySelector('.fa-times')

    const closeBoorger = () => {
        menuBg.style.opacity = '0'
        setTimeout(() => {
            menuBg.style.zIndex = '-1'
        }, 100)

        boorgerMenu.style.top = '-200vh'
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