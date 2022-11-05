const timerModalButton = document.querySelector('.gnb-timer-button')
const timerModalCloseButton = timerModal.querySelector('.close-btn')
const timerModalOverlay = document.querySelector('.overlay')

function openTimerModal() {
  timerModal.classList.add('is-open')
  timerModalOverlay.classList.add('is-active')
}

timerModalButton.addEventListener('click', openTimerModal)

function closeTimerModalclickOverlay() {
  timerModal.classList.remove('is-open')
  timerModalOverlay.classList.remove('is-active')
}

timerModalOverlay.addEventListener('click', closeTimerModalclickOverlay)

function closeTimerModalclickButton() {
  timerModal.classList.remove('is-open')
  timerModalOverlay.classList.remove('is-active')
}

timerModalCloseButton.addEventListener('click', closeTimerModalclickButton)
