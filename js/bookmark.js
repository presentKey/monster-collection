const informationMonsterCard = document.querySelectorAll(
  '.information .monster-card'
)
const bookmarkPage = document.querySelector('.bookmark .title')

function saveBookmark() {
  const monsterCard = this
  const monsterName = this.querySelector('.monster-card-name').innerHTML
  const registerInformation =
    this.parentNode.parentNode.querySelectorAll('.register')
  const bookmarkInformationArray = [monsterCard.outerHTML]

  for (const registerHTML of registerInformation) {
    bookmarkInformationArray.push(registerHTML.outerHTML)
  }

  window.localStorage.setItem(
    monsterName,
    JSON.stringify(bookmarkInformationArray)
  )
}

informationMonsterCard.forEach((image) => {
  image.addEventListener('click', saveBookmark)
})

function showBookmark() {
  if (bookmarkPage !== null) {
    const bookmarkDetail = document.querySelector('.bookmark-detail')

    for (let i = 0; i < window.localStorage.length; i++) {
      const name = window.localStorage.key(i)
      const HTML = window.localStorage.getItem(name)
      const bookmarkWrapper = `<div class="content-wrapper"></div>`

      bookmarkDetail.insertAdjacentHTML('beforeend', bookmarkWrapper)

      const bookmarkContent = document.querySelectorAll('.content-wrapper')

      for (const content of JSON.parse(HTML)) {
        bookmarkContent[i].insertAdjacentHTML('beforeend', content)
      }
    }
  }
}

showBookmark()
