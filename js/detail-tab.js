const detailTab = document.querySelector('.detail-tab')
const detailTabButtonList = detailTab.querySelectorAll('button')

const TOP_HDEDER_MOBILE = 50 + 40
const TOP_HEADER_DESKTOP = 60 + 50

let currentActiveTab = detailTab.querySelector('.is-active')

function activeTab() {
  const tabItem = this.parentNode

  if (currentActiveTab !== tabItem) {
    tabItem.classList.add('is-active')
    currentActiveTab.classList.remove('is-active')
    currentActiveTab = tabItem
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

function detectTabPanelPosition() {
  const panelList = detectDetailTabPanelId()

  const detailTabPanelPositionMap = {}

  panelList.forEach((panel) => {
    const id = panel.getAttribute('id')
    const position = window.scrollY + panel.getBoundingClientRect().top
    detailTabPanelPositionMap[id] = position
  })
}

window.addEventListener('load', detectTabPanelPosition)
window.addEventListener('resize', detectTabPanelPosition)
