const modifierButton = document.querySelector('.set-modifier')
const selectButton = document.querySelector('.set-select')
const setModifier = 'setModifier'

function loadSetting() {
  const modifierCheckBox = document.querySelector('.set-modifier input')

  modifierCheckBox.checked = JSON.parse(
    window.localStorage.getItem(setModifier)
  )

  showModifier()
}

window.addEventListener('load', loadSetting)

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
