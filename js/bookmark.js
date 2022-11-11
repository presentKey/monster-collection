const informationMonsterCard = document.querySelectorAll(
  '.information .monster-card'
)
const bookmarkPage = document.querySelector('.bookmark .title')
const bookmarkToast = document.querySelector('.bookmark-toast')
const bookmarkText = 'bookmark'

let bookmarkDeleteButtonList
let deleteAllButton

function bookmarkToastAnimation() {
  const toastPopUP = [
    { top: '-30px', offset: 0 },
    { top: '15px', offset: 0.7 },
    { top: '-30px', offset: 1 },
  ]
  const toastTiming = {
    duration: 3000,
    easing: 'ease',
  }

  bookmarkToast.animate(toastPopUP, toastTiming)
}

function saveBookmark() {
  const monsterCard = this
  const monsterName = this.querySelector('.monster-card-name').innerHTML
  const registerInformation =
    this.parentNode.parentNode.querySelectorAll('.register')
  const bookmarkInformationArray = [monsterCard.outerHTML]

  for (const registerHTML of registerInformation) {
    bookmarkInformationArray.push(registerHTML.outerHTML)
  }

  const localStorageKey = bookmarkText + monsterName

  window.localStorage.setItem(
    localStorageKey,
    JSON.stringify(bookmarkInformationArray)
  )

  bookmarkToastAnimation()
}

informationMonsterCard.forEach((image) => {
  image.addEventListener('click', saveBookmark)
})

function showBookmark() {
  const bookmarkDetail = document.querySelector('.bookmark-detail')
  let contentCount = 0

  for (let i = 0; i < window.localStorage.length; i++) {
    if (window.localStorage.key(i).startsWith(bookmarkText)) {
      const name = window.localStorage.key(i)
      const HTML = window.localStorage.getItem(name)

      const bookmarkWrapper = `<div class="content-wrapper">
        <button class="delete-btn" type="button">
          <i class="ic-close"></i>
        </button>
      </div>`

      bookmarkDetail.insertAdjacentHTML('beforeend', bookmarkWrapper)

      const bookmarkContent = document.querySelectorAll(
        '.bookmark .content-wrapper'
      )

      for (const content of JSON.parse(HTML)) {
        bookmarkContent[contentCount].insertAdjacentHTML('beforeend', content)
      }
      contentCount++
    } else {
      continue
    }
  }
  updatDeleteButton()
}

if (bookmarkPage !== null) {
  window.addEventListener('load', showBookmark)
}

function updatDeleteButton() {
  bookmarkDeleteButtonList = document.querySelectorAll('.bookmark .delete-btn')
  deleteAllButton = document.querySelector('.bookmark .delete-all-btn')

  bookmarkDeleteButtonList.forEach((button) => {
    button.addEventListener('click', deleteBookmark)
  })
  deleteAllButton.addEventListener('click', deleteAllBookmark)
}

function deleteBookmark() {
  const monsterName =
    this.parentNode.querySelector('.monster-card-name').innerText
  const targetContent = this.parentNode
  const localStorageKey = bookmarkText + monsterName
  targetContent.parentNode.removeChild(targetContent)
  window.localStorage.removeItem(localStorageKey)
}

function deleteAllBookmark() {
  const bookmarkDetail = document.querySelector('.bookmark-detail')
  const contentWrapperAll = document.querySelectorAll(
    '.bookmark .content-wrapper'
  )
  let deleteNameList = []

  for (let i = 0; i < window.localStorage.length; i++) {
    if (window.localStorage.key(i).startsWith(bookmarkText)) {
      const name = window.localStorage.key(i)
      deleteNameList.push(name)
    } else {
      continue
    }
  }

  for (const item of contentWrapperAll) {
    bookmarkDetail.removeChild(item)
  }

  for (const keyName of deleteNameList) {
    window.localStorage.removeItem(keyName)
  }
}
