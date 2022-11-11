const path = require('path')
const fs = require('fs')
const { copySync } = require('fs-extra')

const postcss = require('postcss')
const cssnano = require('cssnano')
const autoprefixer = require('autoprefixer')
const imageminJpegtran = require('imagemin-jpegtran')
const imageminOptipng = require('imagemin-optipng')

const REPOSITORY_NAME = 'monster-collection'
const buildDir = path.resolve(__dirname, '../build')

const HREF_CSS_REGEXP = /href\=\"\/style\.css\"/
const HREF_PAGES_REGEXP = /href\=\"\/pages/g
const SRC_ASSETS_REGEXP = /src\=\"\/assets/g
const SRC_JS_REGEXP = /src\=\"\/js/g

const pagesFileList = [
  'aqua-road.html',
  'arcane-river.html',
  'arcane-river.html',
  'bookmark.html',
  'crosshunter.html',
  'edlstein.html',
  'fieldboss.html',
  'grandis.html',
  'job.html',
  'ludus-lake.html',
  'minar-forest.html',
  'mu-lung.html',
  'nihal-desert.html',
  'temple-of-time.html',
  'victoria-island.html',
  'victoria-isles.html',
]

const imagesFolderList = ['carousel', 'monster', 'region']

const faviconFileList = [
  'android-chrome-192x192.png',
  'android-chrome-512x512.png',
  'apple-touch-icon.png',
  'browserconfig.xml',
  'favicon-16x16.png',
  'favicon-32x32.png',
  'favicon.ico',
  'mstile-70x70.png',
  'mstile-144x144.png',
  'mstile-150x150.png',
  'mstile-310x150.png',
  'mstile-310x310.png',
  'safari-pinned-tab.svg',
  'site.webmanifest',
]

const faviconUrlList = [
  '/apple-touch-icon.png',
  '/favicon-32x32.png',
  '/favicon-16x16.png',
  '/site.webmanifest',
  '/safari-pinned-tab.svg',
]

function throwError(err) {
  if (err) {
    console.log('💥 Oops! Something went wrong')
  }
}

function buildHtml() {
  path.resolve(__dirname, '../index.html'), path.join(buildDir, 'index.html')

  // Resolve pathname
  fs.readFile(path.resolve(__dirname, '../index.html'), (err, data) => {
    if (err) throwError(err)

    let html = data.toString()
    html = html.replaceAll('href="/"', `href="/${REPOSITORY_NAME}"`)
    html = html.replace(HREF_CSS_REGEXP, `href="/${REPOSITORY_NAME}/style.css"`)
    html = html.replace(HREF_PAGES_REGEXP, `href="/${REPOSITORY_NAME}/pages`)
    html = html.replace(SRC_ASSETS_REGEXP, `src="/${REPOSITORY_NAME}/assets`)
    html = html.replace(SRC_JS_REGEXP, `src="/${REPOSITORY_NAME}/js`)

    faviconUrlList.forEach((favicon) => {
      if (!!REPOSITORY_NAME) {
        const newFaviconUrl = favicon.replace('/', `/${REPOSITORY_NAME}/`)
        html = html.replace(favicon, newFaviconUrl)
      }
    })

    fs.writeFile(path.join(buildDir, 'index.html'), html, (err) => {
      throwError(err)
    })
  })
}

function buildPagesHtml() {
  pagesFileList.forEach((page) => {
    path.resolve(__dirname, `../pages/${page}`),
      path.join(buildDir, `/pages/${page}`)

    // Resolve pathname
    fs.readFile(path.resolve(__dirname, `../pages/${page}`), (err, data) => {
      if (err) throwError(err)

      let html = data.toString()
      html = html.replaceAll('href="/"', `href="/${REPOSITORY_NAME}"`)
      html = html.replace(
        HREF_CSS_REGEXP,
        `href="/${REPOSITORY_NAME}/style.css"`
      )
      html = html.replace(HREF_PAGES_REGEXP, `href="/${REPOSITORY_NAME}/pages`)
      html = html.replace(SRC_ASSETS_REGEXP, `src="/${REPOSITORY_NAME}/assets`)
      html = html.replace(SRC_JS_REGEXP, `src="/${REPOSITORY_NAME}/js`)

      faviconUrlList.forEach((favicon) => {
        if (!!REPOSITORY_NAME) {
          const newFaviconUrl = favicon.replace('/', `/${REPOSITORY_NAME}/`)
          html = html.replace(favicon, newFaviconUrl)
        }
      })

      fs.writeFile(path.join(buildDir, `/pages/${page}`), html, (err) => {
        throwError(err)
      })
    })
  })
}

function buildCss() {
  const cssPath = path.join(__dirname, '../style.css')

  fs.readFile(cssPath, (err, css) => {
    if (err) {
      throwError(err)
      return
    }

    postcss([autoprefixer, cssnano])
      .process(css, { from: cssPath })
      .then((result) => {
        fs.writeFile(path.join(buildDir, 'style.css'), result.css, throwError)
      })
  })
}

function copyFavicons() {
  faviconFileList.forEach((filename) => {
    copySync(
      path.resolve(__dirname, `../${filename}`),
      path.join(buildDir, filename)
    )
  })
}

async function optimizeImageAssets() {
  const imagemin = (await import('imagemin')).default

  for (const folder of imagesFolderList) {
    try {
      await imagemin(
        [path.resolve(__dirname, `../assets/images/${folder}/*.{jpg,png,svg}`)],
        {
          destination: path.join(buildDir, `assets/images/${folder}`),
          plugins: [imageminJpegtran(), imageminOptipng()],
        }
      )
    } catch (err) {
      throwError(err)
    }
  }
}

async function build() {
  console.log('------------------------')
  console.log('Start building...')

  // Create `build` directory
  if (!fs.existsSync(buildDir)) fs.mkdirSync(buildDir)

  // Build index.html & pages/*.html & style.css
  buildHtml()
  buildPagesHtml()
  buildCss()

  // Copy js/*.js, assets/fonts/*, favicon files
  copySync(
    path.resolve(__dirname, '../index.html'),
    path.join(buildDir, 'index.html')
  )
  copySync(path.resolve(__dirname, '../pages'), path.join(buildDir, 'pages'))
  copySync(path.resolve(__dirname, '../js'), path.join(buildDir, 'js'))
  copySync(
    path.resolve(__dirname, '../assets/fonts'),
    path.join(buildDir, 'assets/fonts')
  )
  copyFavicons()

  await optimizeImageAssets()

  console.log('🎉 Successfully build your project')
  console.log('🔜 Ready to deploy')
}

build()
