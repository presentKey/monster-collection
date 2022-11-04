const setTimerButtonList = document.querySelectorAll(
  '.register .alarm-info button'
)

const timerBar = document.querySelector('.timer-bar')
const timerBarList = timerBar.querySelector('.timer-bar-list')
const _timerModal = document.querySelector('.timer-modal')
const timerModalList = _timerModal.querySelector('.timer-menu-list')

let deleteButtonList = timerBar.querySelectorAll('.ic-close')
let deleteButtonList_timerModal = timerModalList.querySelectorAll('.ic-close')

let currentTimerBarItems
let currentTimermodalItems

function updateTimerBarItems() {
  currentTimerBarItems = document.querySelectorAll('.timer-bar .timer-bar-item')
  deleteButtonList = document.querySelectorAll('.timer-bar .ic-close')

  currentTimermodalItems = document.querySelectorAll(
    '.timer-modal .timer-menu-item'
  )
  deleteButtonList_timerModal = document.querySelectorAll(
    '.timer-modal .timer-menu-list .ic-close'
  )
}

function deleteTimer_timerBar() {
  const selectTimerBarItem = this.parentNode.parentNode.parentNode
  const selectMonster = selectTimerBarItem
    .querySelector('img')
    .getAttribute('alt')

  currentTimermodalItems.forEach((item) => {
    const existMonster = item.querySelector('img').getAttribute('alt')
    if (existMonster === selectMonster) {
      timerBarList.removeChild(selectTimerBarItem)
      timerModalList.removeChild(item)
    }
  })
}

deleteButtonList.forEach((button) => {
  button.addEventListener('click', deleteTimer_timerBar)
})

function deleteTimer_timerModal() {
  const selectTimerModalItem = this.parentNode.parentNode.parentNode
  const selectMonster = selectTimerModalItem
    .querySelector('img')
    .getAttribute('alt')

  currentTimerBarItems.forEach((item) => {
    const existMonster = item.querySelector('img').getAttribute('alt')
    if (existMonster === selectMonster) {
      timerBarList.removeChild(item)
      timerModalList.removeChild(selectTimerModalItem)
    }
  })
}

deleteButtonList_timerModal.forEach((button) => {
  button.addEventListener('click', deleteTimer_timerModal)
})

function SetTimer() {
  const monsterImage = this.parentNode.parentNode.parentNode.querySelector(
    '.monster-card-image img'
  )
  const monsterImageSrc = monsterImage.getAttribute('src')
  const monsterImageName = monsterImage.getAttribute('alt')
  const time = this.parentNode.querySelector('.time').innerHTML

  const newTimer = `<li class="timer-bar-item">
      <div class="timer">
        <div class="timer-info">
          <div class="boss-36">
            <img
              src="${monsterImageSrc}"
              alt="${monsterImageName}"
            />
          </div>
          <strong class="time"
            ><span class="minute">${time}</span> :
            <span class="second">00</span></strong
          >
        </div>
  
        <div class="timer-button-group">
          <i class="ic-history" aria-label="타이머 재시작"></i>
          <i class="ic-close" aria-label="타이머 삭제"></i>
        </div>
      </div>
    </li>`
  const newTimer_timerModal = `<li class="timer-menu-item">
      <div class="timer">
        <div class="timer-info">
          <div class="boss-36">
            <img
              src="${monsterImageSrc}"
              alt="${monsterImageName}"
            />
          </div>
          <strong class="time"
            ><span class="minute">${time}</span> :
            <span class="second">00</span></strong
          >
        </div>
  
        <div class="timer-button-group">
          <i class="ic-history" aria-label="타이머 재시작"></i>
          <i class="ic-close" aria-label="타이머 삭제"></i>
        </div>
      </div>
    </li>`

  timerBarList.insertAdjacentHTML('beforeend', newTimer)
  timerModalList.insertAdjacentHTML('beforeend', newTimer_timerModal)

  updateTimerBarItems()

  deleteButtonList.forEach((button) => {
    button.addEventListener('click', deleteTimer_timerBar)
  })

  deleteButtonList_timerModal.forEach((button) => {
    button.addEventListener('click', deleteTimer_timerModal)
  })
}

setTimerButtonList.forEach((button) => {
  button.addEventListener('click', SetTimer)
})
