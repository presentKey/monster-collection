const detailTab = document.querySelector('.detail-tab')
const detailTabButtonList = detailTab.querySelectorAll('button')

let currentActiveTab = detailTab.querySelector('.is-active')

function activeTab() {
  const tabItem = this.parentNode

  if (currentActiveTab !== tabItem) {
    tabItem.classList.add('is-active')
    currentActiveTab.classList.remove('is-active')
    currentActiveTab = tabItem
  }
}

detailTabButtonList.forEach((button) => {
  button.addEventListener('click', activeTab)
})
