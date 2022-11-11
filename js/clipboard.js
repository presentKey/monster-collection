const copyButtonList = document.querySelectorAll('.location-info .tag-blue')
const locationToast = document.querySelector('.location-toast')

function locationToastAnimation() {
  const toastPopUP = [
    { top: '-30px', offset: 0 },
    { top: '15px', offset: 0.7 },
    { top: '-30px', offset: 1 },
  ]
  const toastTiming = {
    duration: 3000,
    easing: 'ease',
  }

  locationToast.animate(toastPopUP, toastTiming)
}

function copyLocation() {
  const locationText = this.parentNode.querySelector('.main-location').innerText

  window.navigator.clipboard.writeText(locationText).then(() => {})

  locationToastAnimation()
}

copyButtonList.forEach((button) => {
  button.addEventListener('click', copyLocation)
})
