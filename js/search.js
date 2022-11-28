const searchIconButton = document.querySelector('.gnb-right .ic-search')
const searchModal = document.querySelector('.search-modal')
const searchModalCloseBtn = document.querySelector('.search-modal .close-btn')
const searchModalSubmitButton = document.querySelector(
  '.search-modal .ic-chevron'
)
const searchSubmitButton = document.querySelector(
  '.gnb-left .input-group .ic-chevron'
)
const FormInput = document.querySelector('.gnb-left .form-input')
const modalFormInput = document.querySelector('.search-modal .form-input')
const matchMedia_768 = matchMedia('screen and (min-width: 768px)').matches

function loadItems() {
  return fetch('/monster-collection/data/search.json')
    .then((response) => response.json())
    .then((json) => json.searchItems)
}

function displayItems(items) {
  let searchList

  if (matchMedia_768) {
    searchList = document.querySelector('.search .search-list')
  } else {
    searchList = document.querySelector('.search-modal .search-list')
  }

  searchList.innerHTML = items.map((item) => createHTMLString(item)).join('')
}

function createHTMLString(item) {
  return `
  <li class="search-item">
    <a href="${item.url}">
      <span class="name">${item.name}</span>
    </a>
  </li>
  `
}

function setInputEvent(items) {
  let input

  if (matchMedia_768) {
    input = document.querySelector('.gnb-left .form-input')
  } else {
    input = document.querySelector('.search-modal .form-input')
  }

  input.addEventListener('input', (event) => updateItems(event, items))
}

function updateItems(event, items) {
  const value = event.target.value
  let matchKeyword = []

  items.forEach((item) => {
    if (item.name.indexOf(value) != -1) {
      matchKeyword.push(item)
    }
  })

  displayItems(matchKeyword)
}

function openSearchModal() {
  searchModal.classList.add('is-open')

  loadItems().then((items) => {
    displayItems(items)
    setInputEvent(items)
  })
}

searchIconButton.addEventListener('click', openSearchModal)

function closeSearchModal() {
  searchModal.classList.remove('is-open')
}

searchModalCloseBtn.addEventListener('click', closeSearchModal)

function openKeywordBox() {
  const keywordBox = document.querySelector('.search .search-keyword')

  if (!keywordBox.classList.contains('is-active')) {
    window.addEventListener('click', onClickOutsidCloseKeywordBox)
  }

  keywordBox.classList.add('is-active')

  loadItems().then((items) => {
    displayItems(items)
    setInputEvent(items)
  })
}

FormInput.addEventListener('focus', openKeywordBox)

function onClickOutsidCloseKeywordBox(e) {
  const search = document.querySelector('.search')
  const keywordBox = document.querySelector('.search .search-keyword')

  if (!search.contains(e.target)) {
    keywordBox.classList.remove('is-active')
    window.removeEventListener('click', onClickOutsidCloseKeywordBox)
  }
}

function Locationhref() {
  const matchKeyword = matchMedia_768
    ? document.querySelector('.search .search-item')
    : document.querySelector('.search-modal .search-item')

  if (matchKeyword !== null) {
    location.href = matchKeyword.querySelector('a').getAttribute('href')
  }
}

function onKeyupSearchInput(event) {
  const inputText = matchMedia_768
    ? document.querySelector('.gnb-left .form-input').value
    : document.querySelector('.search-modal .form-input').value

  if (inputText !== '' && event.keyCode === 13) {
    Locationhref()
  }
}

FormInput.addEventListener('keyup', onKeyupSearchInput)
modalFormInput.addEventListener('keyup', onKeyupSearchInput)

function onClickSearchButton() {
  const inputText = matchMedia_768
    ? document.querySelector('.gnb-left .form-input').value
    : document.querySelector('.search-modal .form-input').value

  if (inputText !== '') {
    Locationhref()
  }
}

searchSubmitButton.addEventListener('click', onClickSearchButton)
searchModalSubmitButton.addEventListener('click', onClickSearchButton)
