function tabletMainNavHeight() {
  const tabletSize = window.matchMedia('screen and (min-width: 768px)')
  const desktopSize = window.matchMedia('screen and (min-width: 1200px)')
  const mainNav = document.querySelector('.main-nav')
  const carouselHeight = document.querySelector('.page-carousel').offsetHeight
  const calcTabletHeight = `calc(100vh - 160px - ${carouselHeight}px)`
  const calcDesktopHeight = 'calc(100vh - 160px)'

  if (tabletSize.matches && !desktopSize.matches && window.innerHeight > 768) {
    mainNav.style.height = calcTabletHeight
  } else if (desktopSize.matches) {
    mainNav.style.height = calcDesktopHeight
  }
}

window.addEventListener('load', tabletMainNavHeight)
window.addEventListener('resize', _.throttle(tabletMainNavHeight, 1000))
