const modifierButton = document.querySelector('.set-modifier')
const selectButton = document.querySelector('.set-select')
const eliteText = 'elite'
const setModifier = 'setModifier'

function firstTimeUser() {
  const eliteItems = document.querySelectorAll('.elite-collection-item')

  for (let i = 0; i < window.localStorage.length; i++) {
    if (window.localStorage.key(i).startsWith(eliteText)) {
      return
    }
  }

  for (const [index, item] of eliteItems.entries()) {
    const monsterName = item.querySelector('img').getAttribute('alt')
    const itemArray = [index, item.outerHTML]
    const localStorageKey = eliteText + monsterName
    window.localStorage.setItem(localStorageKey, JSON.stringify(itemArray))
  }
}

function loadCollection() {
  const eliteList = document.querySelector('.elite-collection-list')
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
}

window.addEventListener('load', loadCollection)

function loadSetting() {
  const modifierCheckBox = document.querySelector('.set-modifier input')

  modifierCheckBox.checked = JSON.parse(
    window.localStorage.getItem(setModifier)
  )

  showModifier()
}

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
  const allSelect = '모두 선택'
  const deselect = '선택 해제'
  let currentButton = this.querySelector('button')

  if (currentButton.innerText === allSelect) {
    eliteCards.forEach((card) => {
      card.classList.add('is-active')
    })
    currentButton.innerText = deselect
  } else if (currentButton.innerText === deselect) {
    eliteCards.forEach((card) => {
      card.classList.remove('is-active')
    })
    currentButton.innerText = allSelect
  }
}

selectButton.addEventListener('click', toggleSelectButton)
