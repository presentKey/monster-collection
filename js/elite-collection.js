const modifierButton = document.querySelector('.set-modifier')
const setModifier = 'setModifier'

function showEliteCollection() {
  const modifierCheckBox = document.querySelector('.set-modifier input')

  modifierCheckBox.checked = JSON.parse(
    window.localStorage.getItem(setModifier)
  )

  showModifier()
}

window.addEventListener('load', showEliteCollection)

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
