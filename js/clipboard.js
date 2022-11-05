const copyButtonList = document.querySelectorAll('.location-info .tag-blue')

function copyLocation() {
  const locationText = this.parentNode.querySelector('.main-location').innerText

  window.navigator.clipboard.writeText(locationText).then(() => {})
}

copyButtonList.forEach((button) => {
  button.addEventListener('click', copyLocation)
})
