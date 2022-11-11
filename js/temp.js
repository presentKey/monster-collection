const originalURL =
  'src="/js/carousel.js" <div>abdvc</div> src="/js/full-size.js"'
const REPOSITORY_NAME = 'monster-collection'

const srcRegExp = /src\=\"\/js/g
const hihi = `/src\=\"\/${REPOSITORY_NAME}\/js/`

// const hi = new RegExp(`src="/${REPOSITORY_NAME}/js`)

const newText = originalURL.replace(srcRegExp, `src="/${REPOSITORY_NAME}/js`)
console.log(newText)
