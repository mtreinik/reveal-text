let slides = []
let slideId = 0
let canvas, ctx
let animationHandle = null

// these affect animation speed
const MILLISECONDS_UNTIL_SLIDE_IS_AT_THE_CENTER_OF_THE_SCREEN = 1000
const SLIDE_SPEED = 200
const SLIDE_OUT_SPEED = 100
const SLIDE_IN_SPEED = 1000
const TIME_FACTOR = 0.5

const FONT_SIZE = 300

function deletePassedSlides() {
  slides = slides.filter((slide) => slide.y > -slide.height)
}

function clearSlides() {
  const yOffset = Math.floor(FONT_SIZE / 20)
  slides.forEach((slide) => {
    ctx.clearRect(slide.x - 1, slide.y - yOffset, slide.width + 2, FONT_SIZE)
  })
}

function calculateNewSlidePositions() {
  const nowMillis = new Date().getTime()
  slides.forEach((slide) => {
    const seconds = (nowMillis - slide.centerMillis) / 1000
    const inOrOutSpeed = seconds > 0 ? SLIDE_OUT_SPEED : SLIDE_IN_SPEED
    slide.y = Math.floor(
      canvas.offsetHeight / 2 -
        Math.pow(TIME_FACTOR * seconds, 3) * inOrOutSpeed -
        seconds * SLIDE_SPEED
    )
  })
}

function drawSlides() {
  slides.forEach((slide) => {
    ctx.fillText(slide.contents, slide.x, slide.y)
  })
}

function updateAnimation() {
  clearSlides()
  calculateNewSlidePositions()
  drawSlides()
  deletePassedSlides()

  animationHandle = window.requestAnimationFrame(updateAnimation)
}

function run() {
  canvas = document.getElementById('canvas')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  ctx = canvas.getContext('2d')
  ctx.font = FONT_SIZE + 'px Times New Roman'
  ctx.textBaseline = 'top'

  animationHandle = window.requestAnimationFrame(updateAnimation)
}

function showNextSlide() {
  if (slideId >= slideContents.length) {
    return
  }
  const contents = slideContents[slideId]
  const centerMillis =
    new Date().getTime() +
    MILLISECONDS_UNTIL_SLIDE_IS_AT_THE_CENTER_OF_THE_SCREEN

  const textMetrics = ctx.measureText(contents)
  const width =
    Math.abs(textMetrics.actualBoundingBoxLeft) +
    Math.abs(textMetrics.actualBoundingBoxRight)
  const height = FONT_SIZE
  const x = Math.floor(canvas.offsetWidth / 2 - width / 2)
  const y = canvas.offsetHeight / 2

  const slide = {
    contents,
    centerMillis,
    slideId,
    x,
    y,
    width,
    height,
  }
  slides.push(slide)
  slideId++
}

function showPreviousSlide() {
  if (slideId <= 0) {
    return
  }
  slides.pop()
  slideId--
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function toggleAnimation() {
  if (animationHandle) {
    cancelAnimationFrame(animationHandle)
    animationHandle = null
  } else {
    animationHandle = window.requestAnimationFrame(updateAnimation)
  }
}

document.onkeypress = function (e) {
  switch (e.key) {
    case ' ':
    case 'n':
      showNextSlide()
      break
    case 'p':
      showPreviousSlide()
      break
    case 'Enter':
      toggleAnimation()
      break
  }
}

window.addEventListener('load', () => {
  run()
})
