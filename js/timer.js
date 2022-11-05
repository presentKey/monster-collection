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
let currentTimerModalItems
let timerInterval

function updateTimerItems() {
  currentTimerBarItems = document.querySelectorAll('.timer-bar .timer-bar-item')
  deleteButtonList = document.querySelectorAll('.timer-bar .ic-close')

  currentTimerModalItems = document.querySelectorAll(
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

  currentTimerModalItems.forEach((item) => {
    const existMonster = item.querySelector('img').getAttribute('alt')
    if (existMonster === selectMonster) {
      timerBarList.removeChild(selectTimerBarItem)
      timerModalList.removeChild(item)
      registeredMonsterNameSet.delete(selectMonster)
      updateTimerItems()
      clearInterval(timerInterval)
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
      clearInterval(timerInterval)
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
            ><span class="minute">${time.padStart(2, '0')}</span> :
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
            ><span class="minute">${time.padStart(2, '0')}</span> :
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

function playTimer() {
  let timerMin = this.parentNode.querySelector('.time').innerText
  let monsterName = this.parentNode.parentNode.parentNode
    .querySelector('.monster-card-image img')
    .getAttribute('alt')
  let registeredTimer_timerBar
  let registeredTimer_timerModal
  let registeredtMonsterName

  currentTimerBarItems.forEach((timer) => {
    registeredTimer_timerBar = timer
    registeredtMonsterName = timer.querySelector('img').getAttribute('alt')
  })

  currentTimerModalItems.forEach((timer) => {
    registeredTimer_timerModal = timer
    registeredtMonsterName = timer.querySelector('img').getAttribute('alt')
  })

  let time = timerMin * 60

  if (registeredMonsterNameSet.has(monsterName)) {
    return
  }

  timerInterval = setInterval(() => {
    let min = parseInt(time / 60)
    let sec = time % 60
    if (monsterName === registeredtMonsterName) {
      registeredTimer_timerBar.querySelector('.minute').innerText = min
        .toString()
        .padStart(2, '0')
      registeredTimer_timerBar.querySelector('.second').innerText = sec
        .toString()
        .padStart(2, '0')

      registeredTimer_timerModal.querySelector('.minute').innerText = min
        .toString()
        .padStart(2, '0')
      registeredTimer_timerModal.querySelector('.second').innerText = sec
        .toString()
        .padStart(2, '0')

      time--

      if (time < 0) {
        clearInterval(timerInterval)
        registeredTimer_timerBar.children[0].classList.add('is-alarm')
        registeredTimer_timerModal.children[0].classList.add('is-alarm')
      }
    }
  }, 1000)
}

setTimerButtonList.forEach((button) => {
  button.addEventListener('click', SetTimer)
  button.addEventListener('click', playTimer)
})
