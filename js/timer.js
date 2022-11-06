const setTimerButtonList = document.querySelectorAll(
  '.register .alarm-info button'
)
const timerBar = document.querySelector('.timer-bar')
const timerBarList = timerBar.querySelector('.timer-bar-list')
const timerModal = document.querySelector('.timer-modal')
const timerModalList = timerModal.querySelector('.timer-menu-list')

let registeredInformationMap = new Map()
let intervalMap = new Map()
let currentTimerBarItems
let currentTimerModalItems
let deleteButtonList_timerBar
let deleteButtonList_timerModal
let deleteAble

function timerBarDisplay() {
  if (registeredInformationMap.size >= 1) {
    timerBar.classList.add('is-open')
  } else {
    timerBar.classList.remove('is-open')
  }
}

function updateTimerItems() {
  currentTimerBarItems = document.querySelectorAll('.timer-bar .timer-bar-item')
  currentTimerModalItems = document.querySelectorAll(
    '.timer-modal .timer-menu-item'
  )

  deleteButtonList_timerBar = document.querySelectorAll('.timer-bar .ic-close')
  deleteButtonList_timerModal = document.querySelectorAll(
    '.timer-modal .timer-menu-list .ic-close'
  )
}

function deleteTimer() {
  let timerBarList = timerBar.querySelector('.timer-bar-list')
  let timerModalList = timerModal.querySelector('.timer-menu-list')
  let selectMonster = this.parentNode.parentNode
    .querySelector('img')
    .getAttribute('alt')

  deleteAble = true

  if (registeredInformationMap.has(selectMonster)) {
    timerBarList.removeChild(registeredInformationMap.get(selectMonster)[2])
    timerModalList.removeChild(registeredInformationMap.get(selectMonster)[3])
    registeredInformationMap.delete(selectMonster)

    timerInterval(selectMonster)
    updateTimerItems()
    timerBarDisplay()
  }
}

function timerInterval(monsterName, time, timerBar, timerModal) {
  deleteAble = false

  let timerInterval = setInterval(() => {
    intervalMap.set(monsterName, timerInterval)
    if (!registeredInformationMap.has(monsterName)) {
      clearInterval(intervalMap.get(monsterName))
      intervalMap.delete(monsterName)
    } else {
      if (deleteAble) {
        clearInterval(intervalMap.get(monsterName))
        intervalMap.delete(monsterName)
      } else {
        let min = parseInt(time / 60)
        let sec = time % 60

        timerBar.querySelector('.minute').innerText = min
          .toString()
          .padStart(2, '0')
        timerBar.querySelector('.second').innerText = sec
          .toString()
          .padStart(2, '0')

        timerModal.querySelector('.minute').innerText = min
          .toString()
          .padStart(2, '0')
        timerModal.querySelector('.second').innerText = sec
          .toString()
          .padStart(2, '0')

        time--

        if (time < 0) {
          clearInterval(timerInterval)
          intervalMap.delete(monsterName)
          timerBar.children[0].classList.add('is-alarm')
          timerModal.children[0].classList.add('is-alarm')
        }
      }
    }
  }, 1000)
}

function setTimer() {
  let monsterImage = this.parentNode.parentNode.parentNode.querySelector(
    '.monster-card-image img'
  )
  let monsterImageSrc = monsterImage.getAttribute('src')
  let monsterImageName = monsterImage.getAttribute('alt')
  let respawnTime = this.parentNode.querySelector('.time').innerHTML
  let registeredInformationArray = [monsterImageSrc, respawnTime]

  if (registeredInformationMap.has(monsterImageName)) {
    return
  }

  registeredInformationMap.set(monsterImageName, registeredInformationArray)

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
        ><span class="minute">${respawnTime.padStart(2, '0')}</span> :
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
        ><span class="minute">${respawnTime.padStart(2, '0')}</span> :
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

  timerBarDisplay()
  updateTimerItems()

  registeredInformationArray.push(
    currentTimerBarItems[currentTimerBarItems.length - 1],
    currentTimerModalItems[currentTimerModalItems.length - 1],
    deleteButtonList_timerBar[currentTimerBarItems.length - 1],
    deleteButtonList_timerModal[currentTimerModalItems.length - 1]
  )

  let registeredInformationValue =
    registeredInformationMap.get(monsterImageName)
  let registeredItem_timerBar = registeredInformationValue[2]
  let registeredItem_timerModal = registeredInformationValue[3]

  let time = registeredInformationValue[1] * 60

  timerInterval(
    monsterImageName,
    time,
    registeredItem_timerBar,
    registeredItem_timerModal
  )

  registeredInformationMap.forEach((deleteButton) => {
    deleteButton[4].addEventListener('click', deleteTimer)
    deleteButton[5].addEventListener('click', deleteTimer)
  })
}

setTimerButtonList.forEach((button) => {
  button.addEventListener('click', setTimer)
})
