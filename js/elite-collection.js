const modifierButton = document.querySelector('.set-modifier')

function showModifier(e) {
  if (e.target.tagName === 'LABEL') {
    return
  }

  const modifierCheckBox = document.querySelector('.set-modifier input')
  const nameModifier = document.querySelectorAll('.name-modifier')
  const setModifier = 'setModifier'

  nameModifier.forEach((modifier) => {
    modifier.classList.toggle('is-active')
  })

  window.localStorage.setItem(setModifier, modifierCheckBox.checked)
}

modifierButton.addEventListener('click', showModifier)
