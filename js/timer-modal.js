const getTimerModal = document.querySelector('.timer-modal')
const timerModalButton = document.querySelector('.gnb-timer-button')
const timerModalCloseButton = getTimerModal.querySelector('.close-btn')
const timerModalOverlay = document.querySelector('.overlay')

function openTimerModal() {
  getTimerModal.classList.add('is-open')
  timerModalOverlay.classList.add('is-active')
}

timerModalButton.addEventListener('click', openTimerModal)

function closeTimerModalclickOverlay() {
  getTimerModal.classList.remove('is-open')
  timerModalOverlay.classList.remove('is-active')
}

timerModalOverlay.addEventListener('click', closeTimerModalclickOverlay)

function closeTimerModalclickButton() {
  getTimerModal.classList.remove('is-open')
  timerModalOverlay.classList.remove('is-active')
}

timerModalCloseButton.addEventListener('click', closeTimerModalclickButton)
