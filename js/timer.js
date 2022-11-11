const timerBar = document.querySelector('.timer-bar')
const timerBarList = timerBar.querySelector('.timer-bar-list')
const timerModal = document.querySelector('.timer-modal')
const timerModalList = timerModal.querySelector('.timer-menu-list')

const mainSection = document.querySelector('main')
const categoryNav = document.querySelector('.category-nav')
const tabletMedia = window.matchMedia('screen and (min-width: 768px)')

let registeredInformationMap = new Map()
let resetIntervalMap = new Map()
let currentTimerBarItems
let currentTimerModalItems
let deleteButtonList_timerBar
let deleteButtonList_timerModal
let resetButtonList_timerBar
let resetButtonList_timerModal
let globalFooterPosition

function detectFooterPosition() {
  const globalFooter = document.querySelector('.global-footer')

  globalFooterPosition =
    window.scrollY + globalFooter.getBoundingClientRect().top
}

let timerBarState
const openTimerBar = 'open'
const closeTimerBar = 'close'

function mediaScrollCategoryNav() {
  if (timerBarState === openTimerBar) {
    if (window.scrollY + window.innerHeight <= globalFooterPosition) {
      categoryNav.style.height = 'calc(100vh - 110px)'
    }
    if (window.scrollY + window.innerHeight === document.body.offsetHeight) {
      categoryNav.style.height = 'calc(100vh - 210px)'
    }
  } else {
    if (window.scrollY + window.innerHeight <= globalFooterPosition) {
      categoryNav.style.height = 'calc(100vh - 50px)'
    }

    if (window.scrollY + window.innerHeight === document.body.offsetHeight) {
      categoryNav.style.height = 'calc(100vh - 160px)'
    }
  }
}

const bookmarkDetailTab = document.querySelector('.detail-tab')

function mediaTimerBar() {
  if (tabletMedia.matches && registeredInformationMap.size >= 1) {
    if (bookmarkDetailTab !== null) {
      bookmarkDetailTab.style.top = '110px'
    }
    mainSection.style.paddingTop = '50px'
    categoryNav.style.top = '109px'
    timerBarState = openTimerBar
    mediaScrollCategoryNav()
  } else if (tabletMedia.matches && registeredInformationMap.size === 0) {
    if (bookmarkDetailTab !== null) {
      bookmarkDetailTab.style.top = '60px'
    }
    mainSection.style.paddingTop = '0px'
    categoryNav.style.top = '59px'
    timerBarState = closeTimerBar
    mediaScrollCategoryNav()
  } else {
    if (bookmarkDetailTab !== null) {
      bookmarkDetailTab.style.top = '50px'
    }
    mainSection.style.paddingTop = '0px'
  }
}

window.addEventListener('load', detectFooterPosition)
window.addEventListener('resize', _.throttle(detectFooterPosition, 1000))
window.addEventListener('resize', _.throttle(mediaTimerBar, 1000))
window.addEventListener('scroll', _.throttle(mediaScrollCategoryNav, 300))

function timerBarDisplay() {
  if (registeredInformationMap.size >= 1) {
    timerBar.classList.add('is-open')
  } else {
    timerBar.classList.remove('is-open')
  }
  mediaTimerBar()
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

    updateTimerItems()
    timerBarDisplay()
  }
}

function deleteInterval(interval, intervalMap) {
  clearInterval(interval)
  intervalMap.delete(interval)
}

function timerInterval(
  resetFlag,
  monsterName,
  time,
  timerBarItem,
  timerModalItem
) {
  let interval = setInterval(() => {
    resetIntervalMap.set(interval, monsterName)

    if (resetFlag) {
      if (timerModalItem.querySelector('.is-alarm')) {
        timerBarItem.children[0].classList.remove('is-alarm')
        timerModalItem.children[0].classList.remove('is-alarm')
        resetFlag = false
      } else {
        for (let [interval, name] of resetIntervalMap) {
          if (name === monsterName) {
            deleteInterval(interval, resetIntervalMap)
            resetFlag = false
            return
          }
        }
      }
    }

    if (!registeredInformationMap.has(monsterName)) {
      deleteInterval(interval, resetIntervalMap)
    } else if (timerBarItem === undefined) {
      deleteInterval(interval, resetIntervalMap)
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
        deleteInterval(interval, resetIntervalMap)
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

window.addEventListener('load', function () {
  const setTimerButtonList = document.querySelectorAll(
    '.register .alarm-info button'
  )

  setTimerButtonList.forEach((button) => {
    button.addEventListener('click', setTimer)
  })
})
