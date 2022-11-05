const setTimerButtonList = document.querySelectorAll(
  '.register .alarm-info button'
)
const timerBar = document.querySelector('.timer-bar')
const timerBarList = timerBar.querySelector('.timer-bar-list')
const timerModal = document.querySelector('.timer-modal')
const timerModalList = timerModal.querySelector('.timer-menu-list')

let deleteButtonList = timerBar.querySelectorAll('.ic-close')
let deleteButtonList_timerModal = timerModalList.querySelectorAll('.ic-close')
let registeredMonsterNameSet = new Set()
let currentTimerBarItems
let currentTimermodalItems

function updateTimerItems() {
  currentTimerBarItems = document.querySelectorAll('.timer-bar .timer-bar-item')
  deleteButtonList = document.querySelectorAll('.timer-bar .ic-close')

  currentTimermodalItems = document.querySelectorAll(
    '.timer-modal .timer-menu-item'
  )
  deleteButtonList_timerModal = document.querySelectorAll(
    '.timer-modal .timer-menu-list .ic-close'
  )

  deleteButtonList.forEach((button) => {
    button.addEventListener('click', deleteTimer_timerBar)
  })

  deleteButtonList_timerModal.forEach((button) => {
    button.addEventListener('click', deleteTimer_timerModal)
  })
}

function timerBarDisplay() {
  if (currentTimerBarItems.length >= 1) {
    timerBar.classList.add('is-open')
  } else {
    timerBar.classList.remove('is-open')
  }
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
      registeredMonsterNameSet.delete(selectMonster)
      updateTimerItems()
    }
  })

  timerBarDisplay()
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
      registeredMonsterNameSet.delete(selectMonster)
      updateTimerItems()
    }
  })

  timerBarDisplay()
}

deleteButtonList_timerModal.forEach((button) => {
  button.addEventListener('click', deleteTimer_timerModal)
})

function SetTimer() {
  let monsterImage = this.parentNode.parentNode.parentNode.querySelector(
    '.monster-card-image img'
  )
  let monsterImageSrc = monsterImage.getAttribute('src')
  let monsterImageName = monsterImage.getAttribute('alt')
  let time = this.parentNode.querySelector('.time').innerHTML

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

  if (currentTimerBarItems !== undefined) {
    for (let i = 0; i < currentTimerBarItems.length; i++) {
      registeredMonsterNameSet.add(
        currentTimerBarItems[i].querySelector('img').getAttribute('alt')
      )
    }

    if (registeredMonsterNameSet.has(monsterImageName)) {
      return
    }
  }

  timerBarList.insertAdjacentHTML('beforeend', newTimer)
  timerModalList.insertAdjacentHTML('beforeend', newTimer_timerModal)

  updateTimerItems()
  timerBarDisplay()
}

setTimerButtonList.forEach((button) => {
  button.addEventListener('click', SetTimer)
})
