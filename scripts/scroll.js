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