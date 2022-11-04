const detailTab = document.querySelector('.detail-tab')
const detailTabButtonList = detailTab.querySelectorAll('button')

const TOP_HDEDER_MOBILE = 50 + 40
const TOP_HEADER_DESKTOP = 60 + 50

let currentActiveTab = detailTab.querySelector('.is-active')
let newActiveTab
let disableUpdating = false

function activeTab() {
  const tabItem = this.parentNode

  if (currentActiveTab !== tabItem) {
    disableUpdating = true
    tabItem.classList.add('is-active')
    currentActiveTab.classList.remove('is-active')
    currentActiveTab = tabItem

    setTimeout(() => {
      disableUpdating = false
    }, 1000)
  }
}

function scrollToTabPanel() {
  const tabPanelId = this.parentNode.getAttribute('aria-labelledby')
  const tabPanel = document.querySelector(`#${tabPanelId}`)

  const scrollAmount =
    tabPanel.getBoundingClientRect().top -
    (window.innerWidth >= 768 ? TOP_HEADER_DESKTOP : TOP_HDEDER_MOBILE)

  window.scrollBy({
    top: scrollAmount,
  })
}

detailTabButtonList.forEach((button) => {
  button.addEventListener('click', activeTab)
  button.addEventListener('click', scrollToTabPanel)
})

function detectDetailTabPanelId() {
  const detailTabItem = document.querySelectorAll('.detail-tab-item')
  const detailTabPanelIdList = new Array()

  for (let i = 0; i < detailTabItem.length; i++) {
    detailTabPanelIdList.push(detailTabItem[i].getAttribute('aria-labelledby'))
  }

  const detailTabPanelList = detailTabPanelIdList.map((panelId) => {
    const tabPanel = document.querySelector(`#${panelId}`)
    return tabPanel
  })

  return detailTabPanelList
}

const detailTabPanelPositionMap = {}

function detectTabPanelPosition() {
  const panelList = detectDetailTabPanelId()

  panelList.forEach((panel) => {
    const id = panel.getAttribute('id')
    const position = window.scrollY + panel.getBoundingClientRect().top
    detailTabPanelPositionMap[id] = position
  })

  updateActiveTabOnScroll()
}

function job(scrolledAmount) {
  if (scrolledAmount >= detailTabPanelPositionMap['demon-slayer']) {
    newActiveTab = detailTabButtonList[8]
  } else if (scrolledAmount >= detailTabPanelPositionMap['zero']) {
    newActiveTab = detailTabButtonList[7]
  } else if (scrolledAmount >= detailTabPanelPositionMap['cain']) {
    newActiveTab = detailTabButtonList[6]
  } else if (scrolledAmount >= detailTabPanelPositionMap['lala']) {
    newActiveTab = detailTabButtonList[5]
  } else if (scrolledAmount >= detailTabPanelPositionMap['ho-young']) {
    newActiveTab = detailTabButtonList[4]
  } else if (scrolledAmount >= detailTabPanelPositionMap['cadena']) {
    newActiveTab = detailTabButtonList[3]
  } else if (scrolledAmount >= detailTabPanelPositionMap['illium']) {
    newActiveTab = detailTabButtonList[2]
  } else if (scrolledAmount >= detailTabPanelPositionMap['angelic-buster']) {
    newActiveTab = detailTabButtonList[1]
  } else {
    newActiveTab = detailTabButtonList[0]
  }

  if (window.scrollY + window.innerHeight === document.body.offsetHeight) {
    newActiveTab = detailTabButtonList[8]
  }
}
function crosshunter(scrolledAmount) {
  if (scrolledAmount >= detailTabPanelPositionMap['replace']) {
    newActiveTab = detailTabButtonList[1]
  } else {
    newActiveTab = detailTabButtonList[0]
  }

  if (window.scrollY + window.innerHeight === document.body.offsetHeight) {
    newActiveTab = detailTabButtonList[1]
  }
}
function fieldboss(scrolledAmount) {
  newActiveTab = detailTabButtonList[0]
}
function victoriaIsland(scrolledAmount) {
  if (scrolledAmount >= detailTabPanelPositionMap['sleepywood']) {
    newActiveTab = detailTabButtonList[1]
  } else {
    newActiveTab = detailTabButtonList[0]
  }

  if (window.scrollY + window.innerHeight === document.body.offsetHeight) {
    newActiveTab = detailTabButtonList[1]
  }
}
function victoriaIsles(scrolledAmount) {
  newActiveTab = detailTabButtonList[0]
}
function edlstein(scrolledAmount) {
  newActiveTab = detailTabButtonList[0]
}
function elnath(scrolledAmount) {
  if (scrolledAmount >= detailTabPanelPositionMap['elnath']) {
    newActiveTab = detailTabButtonList[1]
  } else {
    newActiveTab = detailTabButtonList[0]
  }

  if (window.scrollY + window.innerHeight === document.body.offsetHeight) {
    newActiveTab = detailTabButtonList[1]
  }
}
function ludusLake(scrolledAmount) {
  if (scrolledAmount >= detailTabPanelPositionMap['ludus-lake']) {
    newActiveTab = detailTabButtonList[3]
  } else if (scrolledAmount >= detailTabPanelPositionMap['near-ludus-lake']) {
    newActiveTab = detailTabButtonList[2]
  } else if (scrolledAmount >= detailTabPanelPositionMap['ellin-forest']) {
    newActiveTab = detailTabButtonList[1]
  } else {
    newActiveTab = detailTabButtonList[0]
  }

  if (window.scrollY + window.innerHeight === document.body.offsetHeight) {
    newActiveTab = detailTabButtonList[3]
  }
}
function aquaLoad(scrolledAmount) {
  newActiveTab = detailTabButtonList[0]
}
function nihalDesert(scrolledAmount) {
  if (scrolledAmount >= detailTabPanelPositionMap['magatia']) {
    newActiveTab = detailTabButtonList[1]
  } else {
    newActiveTab = detailTabButtonList[0]
  }

  if (window.scrollY + window.innerHeight === document.body.offsetHeight) {
    newActiveTab = detailTabButtonList[1]
  }
}
function muLung(scrolledAmount) {
  newActiveTab = detailTabButtonList[0]
}
function minarForest(scrolledAmount) {
  if (scrolledAmount >= detailTabPanelPositionMap['dragon-forest']) {
    newActiveTab = detailTabButtonList[1]
  } else {
    newActiveTab = detailTabButtonList[0]
  }

  if (window.scrollY + window.innerHeight === document.body.offsetHeight) {
    newActiveTab = detailTabButtonList[1]
  }
}
function templeOfTime(scrolledAmount) {
  if (scrolledAmount >= detailTabPanelPositionMap['temple-of-time']) {
    newActiveTab = detailTabButtonList[1]
  } else {
    newActiveTab = detailTabButtonList[0]
  }

  if (window.scrollY + window.innerHeight === document.body.offsetHeight) {
    newActiveTab = detailTabButtonList[1]
  }
}
function grandis(scrolledAmount) {
  if (scrolledAmount >= detailTabPanelPositionMap['toolen-city']) {
    newActiveTab = detailTabButtonList[7]
  } else if (scrolledAmount >= detailTabPanelPositionMap['narin']) {
    newActiveTab = detailTabButtonList[6]
  } else if (scrolledAmount >= detailTabPanelPositionMap['cheong-woon']) {
    newActiveTab = detailTabButtonList[5]
  } else if (scrolledAmount >= detailTabPanelPositionMap['asylum']) {
    newActiveTab = detailTabButtonList[4]
  } else if (scrolledAmount >= detailTabPanelPositionMap['heliseum']) {
    newActiveTab = detailTabButtonList[3]
  } else if (scrolledAmount >= detailTabPanelPositionMap['verdel']) {
    newActiveTab = detailTabButtonList[2]
  } else if (scrolledAmount >= detailTabPanelPositionMap['pantheon']) {
    newActiveTab = detailTabButtonList[1]
  } else {
    newActiveTab = detailTabButtonList[0]
  }

  if (window.scrollY + window.innerHeight === document.body.offsetHeight) {
    newActiveTab = detailTabButtonList[7]
  }
}
function arcaneRiver(scrolledAmount) {
  newActiveTab = detailTabButtonList[0]
}

function updateActiveTabOnScroll() {
  const currentCategory = document.querySelector(
    '.category-nav-item.is-active'
  ).innerText

  if (disableUpdating) {
    return
  }

  const scrolledAmount =
    window.scrollY +
    (window.innerWidth >= 768
      ? TOP_HEADER_DESKTOP + 100
      : TOP_HDEDER_MOBILE + 88)

  if (currentCategory === '직업') {
    job(scrolledAmount)
  } else if (currentCategory === '크로스헌터') {
    crosshunter(scrolledAmount)
  } else if (currentCategory === '필드보스') {
    fieldboss(scrolledAmount)
  } else if (currentCategory === '빅토리아 아일랜드') {
    victoriaIsland(scrolledAmount)
  } else if (currentCategory === '빅토리아 인근 섬') {
    victoriaIsles(scrolledAmount)
  } else if (currentCategory === '에델슈타인') {
    edlstein(scrolledAmount)
  } else if (currentCategory === '엘나스 산맥') {
    elnath(scrolledAmount)
  } else if (currentCategory === '루더스 호수') {
    ludusLake(scrolledAmount)
  } else if (currentCategory === '아쿠아로드') {
    aquaLoad(scrolledAmount)
  } else if (currentCategory === '니할사막') {
    nihalDesert(scrolledAmount)
  } else if (currentCategory === '무릉도원') {
    muLung(scrolledAmount)
  } else if (currentCategory === '미나르 숲') {
    minarForest(scrolledAmount)
  } else if (currentCategory === '시간의 신전') {
    templeOfTime(scrolledAmount)
  } else if (currentCategory === '그란디스') {
    grandis(scrolledAmount)
  } else if (currentCategory === '아케인리버') {
    arcaneRiver(scrolledAmount)
  } else {
    return
  }

  if (newActiveTab) {
    newActiveTab = newActiveTab.parentNode

    if (newActiveTab !== currentActiveTab) {
      newActiveTab.classList.add('is-active')
      if (currentActiveTab !== null) {
        currentActiveTab.classList.remove('is-active')
      }
      currentActiveTab = newActiveTab
    }
  }
}

window.addEventListener('load', detectTabPanelPosition)
window.addEventListener('resize', detectTabPanelPosition)
window.addEventListener('scroll', updateActiveTabOnScroll)
