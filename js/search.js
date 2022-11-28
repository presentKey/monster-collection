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

function onClickOutsidCloseKeywordBox(event) {
  const search = document.querySelector('.search')
  const keywordBox = document.querySelector('.search .search-keyword')

  if (!search.contains(event.target)) {
    keywordBox.classList.remove('is-active')
    window.removeEventListener('click', onClickOutsidCloseKeywordBox)
    currentIndex = -1
  }
}

function LocationHref() {
  const matchKeyword = matchMedia_768
    ? document.querySelector('.search .search-item')
    : document.querySelector('.search-modal .search-item')

  if (matchKeyword !== null) {
    location.href = matchKeyword.querySelector('a').getAttribute('href')
  }
}

let currentIndex = -1
let previousItem

function arrowKeyMove(event) {
  event.preventDefault()
  const matchKeywordList = matchMedia_768
    ? document.querySelectorAll('.search .search-item')
    : document.querySelectorAll('.search-modal .search-item')
  const length = matchKeywordList.length

  if (event.keyCode === 38 || event.keyCode === 40) {
    if (previousItem !== undefined) {
      previousItem.classList.remove('is-current')
    }

    event.keyCode === 38 ? currentIndex-- : currentIndex++

    if (currentIndex >= length) {
      currentIndex = 0
    } else if (currentIndex < 0) {
      currentIndex = length - 1
    }

    let currentItem = matchKeywordList[currentIndex]
    currentItem.classList.add('is-current')
    previousItem = currentItem
    FormInput.value = currentItem.querySelector('span').innerText
  }
}

function onKeydownSearchInput(event) {
  const inputText = matchMedia_768
    ? document.querySelector('.gnb-left .form-input').value
    : document.querySelector('.search-modal .form-input').value

  if (inputText === '') {
    currentIndex = -1
  }

  if (inputText !== '' && event.keyCode === 13) {
    LocationHref()
  }

  if (event.keyCode === 38 || event.keyCode === 40) {
    arrowKeyMove(event)
  }
}

FormInput.addEventListener('keydown', onKeydownSearchInput)
modalFormInput.addEventListener('keydown', onKeydownSearchInput)

function onClickSearchButton() {
  const inputText = matchMedia_768
    ? document.querySelector('.gnb-left .form-input').value
    : document.querySelector('.search-modal .form-input').value

  if (inputText !== '') {
    LocationHref()
  }
}

searchSubmitButton.addEventListener('click', onClickSearchButton)
searchModalSubmitButton.addEventListener('click', onClickSearchButton)
