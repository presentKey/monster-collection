const searchIconButton = document.querySelector('.gnb-right .ic-search')
const searchModal = document.querySelector('.search-modal')
const searchOverlay = document.querySelector('.overlay')

const searchModalSubmitButton = document.querySelector(
  '.search-modal .ic-chevron'
)
const searchSubmitButton = document.querySelector(
  '.gnb-left .input-group .ic-chevron'
)
const FormInput = document.querySelector('.gnb-left .form-input')

const googleLink =
  'https://www.google.com/search?q=site%3Apresentkey.github.io+'

function openSearchModal() {
  searchModal.classList.add('is-open')
  searchOverlay.classList.add('is-active')
}

searchIconButton.addEventListener('click', openSearchModal)

function closeSearchModal() {
  searchModal.classList.remove('is-open')
  searchOverlay.classList.remove('is-active')
}

searchOverlay.addEventListener('click', closeSearchModal)

function mobileGoogleSearch() {
  const inputText = document.querySelector('.search-modal .form-input').value

  if (inputText !== '') {
    location.href = googleLink + inputText
  }
}

searchModalSubmitButton.addEventListener('click', mobileGoogleSearch)

function desktopGoogleSearch() {
  const inputText = document.querySelector('.gnb-left .form-input').value

  if (inputText !== '') {
    location.href = googleLink + inputText
  }
}

searchSubmitButton.addEventListener('click', desktopGoogleSearch)

function keyPressSearch(e) {
  const inputText = document.querySelector('.gnb-left .form-input').value

  if (inputText !== '' && e.keyCode === 13) {
    location.href = googleLink + inputText
  }
}
FormInput.addEventListener('keypress', keyPressSearch)
