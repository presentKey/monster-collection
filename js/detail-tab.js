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
function fieldboss() {
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
function victoriaIsles() {
  newActiveTab = detailTabButtonList[0]
}
function edlstein() {
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
function aquaLoad() {
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
function muLung() {
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
    newActiveTab = detailTabButtonList[8]
  } else if (scrolledAmount >= detailTabPanelPositionMap['narin']) {
    newActiveTab = detailTabButtonList[7]
  } else if (scrolledAmount >= detailTabPanelPositionMap['cheong-woon']) {
    newActiveTab = detailTabButtonList[6]
  } else if (scrolledAmount >= detailTabPanelPositionMap['savage-terminal']) {
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
    newActiveTab = detailTabButtonList[8]
  }
}
function arcaneRiver() {
  newActiveTab = detailTabButtonList[0]
}

function friends() {
  newActiveTab = detailTabButtonList[0]
}

const ActiveTabMap = {
  직업(scrolledAmount) {
    job(scrolledAmount)
  },
  크로스헌터(scrolledAmount) {
    crosshunter(scrolledAmount)
  },
  필드보스() {
    fieldboss()
  },
  '빅토리아 아일랜드'(scrolledAmount) {
    victoriaIsland(scrolledAmount)
  },
  '빅토리아 인근 섬'() {
    victoriaIsles()
  },
  에델슈타인() {
    edlstein()
  },
  '엘나스 산맥'(scrolledAmount) {
    elnath(scrolledAmount)
  },
  '루더스 호수'(scrolledAmount) {
    ludusLake(scrolledAmount)
  },
  아쿠아로드() {
    aquaLoad()
  },
  니할사막(scrolledAmount) {
    nihalDesert(scrolledAmount)
  },
  무릉도원() {
    muLung()
  },
  '미나르 숲'(scrolledAmount) {
    minarForest(scrolledAmount)
  },
  '시간의 신전'(scrolledAmount) {
    templeOfTime(scrolledAmount)
  },
  그란디스(scrolledAmount) {
    grandis(scrolledAmount)
  },
  아케인리버() {
    arcaneRiver()
  },
  프렌즈() {
    arcaneRiver()
  },
}

function executeScrollActiveTab(currentCategory, scrolledAmount) {
  ActiveTabMap[currentCategory](scrolledAmount)
}

function updateActiveTabOnScroll() {
  let currentCategory

  if (window.innerWidth < 768) {
    currentCategory = document.querySelector(
      '.sidebar-nav-item.is-active a'
    ).innerHTML
  } else {
    currentCategory = document.querySelector(
      '.category-nav-item.is-active a'
    ).innerText
  }

  const scrolledAmount =
    window.scrollY +
    (window.innerWidth >= 768
      ? TOP_HEADER_DESKTOP + 100
      : TOP_HDEDER_MOBILE + 88)

  if (disableUpdating) {
    return
  }

  executeScrollActiveTab(currentCategory, scrolledAmount)

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
window.addEventListener('resize', _.throttle(detectTabPanelPosition, 1000))
window.addEventListener('scroll', _.throttle(updateActiveTabOnScroll, 300))
