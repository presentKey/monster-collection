const sidebarMenuButton = document.querySelector('.gnb-menu-button')
const sidebar = document.querySelector('.sidebar')
const sidebarCloseButton = sidebar.querySelector('.close-btn')
const sidebarOverlay = document.querySelector('.overlay')

function openSidebar() {
  sidebar.classList.add('is-open')
  sidebarOverlay.classList.add('is-active')
}

sidebarMenuButton.addEventListener('click', openSidebar)

function closeSidebarClickOverlay() {
  sidebar.classList.remove('is-open')
  sidebarOverlay.classList.remove('is-active')
}

sidebarOverlay.addEventListener('click', closeSidebarClickOverlay)

function closeSidebarClickButton() {
  sidebar.classList.remove('is-open')
  sidebarOverlay.classList.remove('is-active')
}

sidebarCloseButton.addEventListener('click', closeSidebarClickButton)
