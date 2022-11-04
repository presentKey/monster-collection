const setTimerButtonList = document.querySelectorAll(
  '.register .alarm-info button'
)

const timerBar = document.querySelector('.timer-bar')
const timerBarList = timerBar.querySelector('.timer-bar-list')
let deleteButtonList = timerBar.querySelectorAll('.ic-close')

let currentTimerBarItems

function updateTimerBarItems() {
  currentTimerBarItems = document.querySelectorAll('.timer-bar .timer-bar-item')
  deleteButtonList = document.querySelectorAll('.timer-bar .ic-close')
}

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

  timerBarList.insertAdjacentHTML('afterbegin', newTimer)

  updateTimerBarItems()

  deleteButtonList.forEach((button) => {
    button.addEventListener('click', deleteTimer)
  })
}

setTimerButtonList.forEach((button) => {
  button.addEventListener('click', SetTimer)
})

function deleteTimer() {
  const selectTimerBarItem = this.parentNode.parentNode.parentNode

  currentTimerBarItems.forEach((item) => {
    if (item === selectTimerBarItem) {
      timerBarList.removeChild(selectTimerBarItem)
    }
  })
}

deleteButtonList.forEach((button) => {
  button.addEventListener('click', deleteTimer)
})
