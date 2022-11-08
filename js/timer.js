const setTimerButtonList = document.querySelectorAll(
  '.register .alarm-info button'
)
const timerBar = document.querySelector('.timer-bar')
const timerBarList = timerBar.querySelector('.timer-bar-list')
const timerModal = document.querySelector('.timer-modal')
const timerModalList = timerModal.querySelector('.timer-menu-list')

let registeredInformationMap = new Map()
let resetIntervalMap = new Map()
let currentTimerBarItems
let currentTimerModalItems
let deleteButtonList_timerBar
let deleteButtonList_timerModal
let resetButtonList_timerBar
let resetButtonList_timerModal

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

  resetButtonList_timerBar = document.querySelectorAll('.timer-bar .ic-history')
  resetButtonList_timerModal = document.querySelectorAll(
    '.timer-modal .timer-menu-list .ic-history'
  )
}

function resetTimer(
  resetFlag,
  monsterName,
  time,
  timerBarItem,
  timerModalItem
) {
  resetFlag = true
  timerInterval(resetFlag, monsterName, time, timerBarItem, timerModalItem)
}

function deleteTimer() {
  let timerBarList = timerBar.querySelector('.timer-bar-list')
  let timerModalList = timerModal.querySelector('.timer-menu-list')
  let selectMonster = this.parentNode.parentNode
    .querySelector('img')
    .getAttribute('alt')
  let resetFlag = false

  if (registeredInformationMap.has(selectMonster)) {
    timerBarList.removeChild(registeredInformationMap.get(selectMonster)[2])
    timerModalList.removeChild(registeredInformationMap.get(selectMonster)[3])
    registeredInformationMap.delete(selectMonster)

    timerInterval(resetFlag, selectMonster)
    updateTimerItems()
    timerBarDisplay()
  }
}

function timerInterval(
  resetFlag,
  monsterName,
  time,
  timerBarItem,
  timerModalItem
) {
  let intervalMap = new Map()

  let interval = setInterval(() => {
    intervalMap.set(monsterName, interval)
    resetIntervalMap.set(interval, monsterName)

    if (resetFlag) {
      if (timerModalItem.querySelector('.is-alarm')) {
        timerBarItem.children[0].classList.remove('is-alarm')
        timerModalItem.children[0].classList.remove('is-alarm')
        resetFlag = false
      } else {
        for (let [key, value] of resetIntervalMap) {
          if (value === monsterName) {
            clearInterval(key)
            intervalMap.delete(monsterName)
            resetIntervalMap.delete(key)
            resetFlag = false
            return
          }
        }
      }
    }

    if (!registeredInformationMap.has(monsterName)) {
      clearInterval(intervalMap.get(monsterName))
      intervalMap.delete(monsterName)
      resetIntervalMap.delete(interval)
    } else if (timerBarItem === undefined) {
      clearInterval(intervalMap.get(monsterName))
      intervalMap.delete(monsterName)
      resetIntervalMap.delete(interval)
    } else {
      let min = parseInt(time / 60)
      let sec = time % 60

      timerBarItem.querySelector('.minute').innerText = min
        .toString()
        .padStart(2, '0')
      timerBarItem.querySelector('.second').innerText = sec
        .toString()
        .padStart(2, '0')

      timerModalItem.querySelector('.minute').innerText = min
        .toString()
        .padStart(2, '0')
      timerModalItem.querySelector('.second').innerText = sec
        .toString()
        .padStart(2, '0')

      time--

      if (time < 0) {
        clearInterval(interval)
        intervalMap.delete(monsterName)
        resetIntervalMap.delete(interval)
        timerBarItem.children[0].classList.add('is-alarm')
        timerModalItem.children[0].classList.add('is-alarm')
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
    deleteButtonList_timerModal[currentTimerModalItems.length - 1],
    resetButtonList_timerBar[currentTimerBarItems.length - 1],
    resetButtonList_timerModal[currentTimerModalItems.length - 1]
  )

  let registeredInformationValue =
    registeredInformationMap.get(monsterImageName)
  let registeredItem_timerBar = registeredInformationValue[2]
  let registeredItem_timerModal = registeredInformationValue[3]

  let time = registeredInformationValue[1] * 60
  let resetFlag = false

  timerInterval(
    resetFlag,
    monsterImageName,
    time,
    registeredItem_timerBar,
    registeredItem_timerModal
  )

  registeredInformationMap.forEach((deleteButton) => {
    deleteButton[4].addEventListener('click', deleteTimer)
    deleteButton[5].addEventListener('click', deleteTimer)
  })

  registeredInformationMap
    .get(monsterImageName)[6]
    .addEventListener('click', function () {
      resetTimer(
        resetFlag,
        monsterImageName,
        time,
        registeredItem_timerBar,
        registeredItem_timerModal
      )
    })
  registeredInformationMap
    .get(monsterImageName)[7]
    .addEventListener('click', function () {
      resetTimer(
        resetFlag,
        monsterImageName,
        time,
        registeredItem_timerBar,
        registeredItem_timerModal
      )
    })
}

setTimerButtonList.forEach((button) => {
  button.addEventListener('click', setTimer)
})