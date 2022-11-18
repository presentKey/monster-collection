const eliteList = document.querySelector('.elite-collection-list')
const modifierButton = document.querySelector('.set-modifier')
const selectButton = document.querySelector('.set-select')
const eliteText = 'elite'
const setModifier = 'setModifier'
const setAllSelect = 'setAllselect'
const allSelect = '모두 선택'
const deselect = '모두 해제'

function saveAllItems() {
  const eliteItems = document.querySelectorAll('.elite-collection-item')

  for (const [index, item] of eliteItems.entries()) {
    const monsterName = item.querySelector('img').getAttribute('alt')
    const itemArray = [index, item.outerHTML]
    const localStorageKey = eliteText + monsterName
    window.localStorage.setItem(localStorageKey, JSON.stringify(itemArray))
  }
}

function firstTimeUser() {
  for (let i = 0; i < window.localStorage.length; i++) {
    if (window.localStorage.key(i).startsWith(eliteText)) {
      return
    }
  }

  saveAllItems()
}

function loadCollection() {
  const eliteMap = new Map()

  firstTimeUser()

  for (let i = 0; i < window.localStorage.length; i++) {
    if (window.localStorage.key(i).startsWith(eliteText)) {
      const monsterName = window.localStorage.key(i)
      const valueArray = JSON.parse(window.localStorage.getItem(monsterName))

      eliteMap.set(monsterName, valueArray)
    }
  }

  let ascSort = new Map([...eliteMap].sort((a, b) => a[1][0] - b[1][0]))
  eliteList.innerHTML = ''

  ascSort.forEach((value) => {
    eliteList.insertAdjacentHTML('beforeend', value[1])
  })

  loadSetting()
  getCard()
}

function loadSetting() {
  const modifierCheckBox = document.querySelector('.set-modifier input')

  modifierCheckBox.checked = JSON.parse(
    window.localStorage.getItem(setModifier)
  )

  showModifier()

  const selectButton = document.querySelector('.setting .select-btn')

  JSON.parse(window.localStorage.getItem(setAllSelect))
    ? (selectButton.innerText = deselect)
    : (selectButton.innerText = allSelect)
}

window.addEventListener('load', loadCollection)

function clickModifierButton(e) {
  if (e.target.tagName === 'LABEL') {
    return
  }

  showModifier()
}

function showModifier() {
  const modifierCheckBox = document.querySelector('.set-modifier input')
  const nameModifier = document.querySelectorAll('.name-modifier')

  if (modifierCheckBox.checked) {
    nameModifier.forEach((modifier) => {
      modifier.classList.add('is-active')
    })
  } else {
    nameModifier.forEach((modifier) => {
      modifier.classList.remove('is-active')
    })
  }

  window.localStorage.setItem(setModifier, modifierCheckBox.checked)
}

modifierButton.addEventListener('click', clickModifierButton)

function toggleSelectButton() {
  const eliteCards = document.querySelectorAll('.elite-card')
  let currentButton = this.querySelector('button')
  let selected

  if (currentButton.innerText === allSelect) {
    eliteCards.forEach((card) => {
      card.classList.add('is-active')
      selected = true
    })
    currentButton.innerText = deselect
  } else if (currentButton.innerText === deselect) {
    eliteCards.forEach((card) => {
      card.classList.remove('is-active')
    })
    currentButton.innerText = allSelect
    selected = false
  }

  saveAllItems()

  window.localStorage.setItem(setAllSelect, selected)
}

selectButton.addEventListener('click', toggleSelectButton)

function activeCard() {
  const monsterName = this.querySelector('img').getAttribute('alt')
  const localStorageKey = eliteText + monsterName
  const getStoredArray = JSON.parse(
    window.localStorage.getItem(localStorageKey)
  )

  this.classList.toggle('is-active')
  getStoredArray[1] = this.parentNode.outerHTML
  window.localStorage.setItem(localStorageKey, JSON.stringify(getStoredArray))
}

function getCard() {
  const eliteCards = document.querySelectorAll('.elite-card')

  eliteCards.forEach((card) => {
    card.addEventListener('click', activeCard)
  })
}

let picked = null
let pickedIndex = null

function dragStart(e) {
  const targetItem = e.target.parentNode.parentNode.parentNode

  picked = targetItem
  pickedIndex = [...targetItem.parentNode.children].indexOf(targetItem)
}

function dragOver(e) {
  e.preventDefault()
}

function dragDrop(e) {
  const targetItem = e.target.parentNode.parentNode.parentNode
  const index = [...targetItem.parentNode.children].indexOf(targetItem)

  let originPlace
  let isLast = false

  if (e.target.nodeName !== 'IMG') {
    return
  }

  if (picked.nextSibling) {
    originPlace = picked.nextSibling
  } else {
    originPlace = picked.previousSibling

    isLast = true
  }

  index > pickedIndex ? targetItem.after(picked) : targetItem.before(picked)
  isLast ? originPlace.after(targetItem) : originPlace.before(targetItem)

  const pickedKey = eliteText + picked.querySelector('img').getAttribute('alt')
  const targetKey =
    eliteText + targetItem.querySelector('img').getAttribute('alt')
  const pickedItemArray = [index, picked.outerHTML]
  const targetItemArray = [pickedIndex, targetItem.outerHTML]

  window.localStorage.setItem(pickedKey, JSON.stringify(pickedItemArray))
  window.localStorage.setItem(targetKey, JSON.stringify(targetItemArray))
}

eliteList.addEventListener('dragstart', dragStart)
eliteList.addEventListener('dragover', dragOver)
eliteList.addEventListener('drop', dragDrop)
