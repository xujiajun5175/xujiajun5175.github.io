/*
 * @Author: 徐家俊 15151832830@163.com
 * @Date: 2024-10-29 09:15:09
 * @LastEditTime: 2024-10-29 09:19:53
 * @LastEditors: 徐家俊 15151832830@163.com
 * @Description:波纹 涟漪
 * @FilePath: /my-astro/src/components/Button/ripple.ts
 */

const DELAY_RIPPLE = 80
const stopSymbol = Symbol('rippleStop')

function isTouchEvent(e) {
  return e.constructor.name === 'TouchEvent'
}

function isKeyboardEvent(e) {
  return e.constructor.name === 'KeyboardEvent'
}

const calculate = (e, el) => {
  let localX = 0
  let localY = 0

  if (!isKeyboardEvent(e)) {
    const offset = el.getBoundingClientRect()
    const target = isTouchEvent(e) ? e.touches[e.touches.length - 1] : e

    localX = target.clientX - offset.left
    localY = target.clientY - offset.top
  }

  let radius = 0
  let scale = 0.3
  if (el.classList.contains('circle')) {
    scale = 0.15
    radius = el.clientWidth / 2
    radius = el.classList.contains('center')
      ? radius
      : radius + Math.sqrt((localX - radius) ** 2 + (localY - radius) ** 2) / 4
  } else {
    radius = Math.sqrt(el.clientWidth ** 2 + el.clientHeight ** 2) / 2
  }

  const centerX = `${(el.clientWidth - radius * 2) / 2}px`
  const centerY = `${(el.clientHeight - radius * 2) / 2}px`

  const x = el.classList.contains('center') ? centerX : `${localX - radius}px`
  const y = el.classList.contains('center') ? centerY : `${localY - radius}px`

  return { radius, scale, x, y, centerX, centerY }
}

const ripples = {
  show(e, el) {
    if (!el.classList.contains('ripple-enabled')) {
      return
    }

    const container = document.createElement('span')
    const animation = document.createElement('span')

    container.appendChild(animation)
    container.className = 'v-ripple__container'
    animation.className = 'v-ripple__animation'

    const { radius, scale, x, y, centerX, centerY } = calculate(e, el)

    const size = `${radius * 2}px`
    animation.style.width = size
    animation.style.height = size

    el.appendChild(container)

    if (el.style.position === 'static') {
      el.style.position = 'relative'
      el.dataset.previousPosition = 'static'
    }

    animation.classList.add('v-ripple__animation--enter')
    animation.classList.add('v-ripple__animation--visible')
    animation.style.transform = `translate(${x}, ${y}) scale3d(${scale},${scale},${scale})`
    animation.dataset.activated = String(performance.now())

    setTimeout(() => {
      animation.classList.remove('v-ripple__animation--enter')
      animation.classList.add('v-ripple__animation--in')
      animation.style.transform = `translate(${centerX}, ${centerY}) scale3d(1,1,1)`
    }, 0)
  },

  hide(el) {
    if (!el.classList.contains('ripple-enabled')) return

    const ripples = el.getElementsByClassName('v-ripple__animation')

    if (ripples.length === 0) return
    const animation = ripples[ripples.length - 1]

    if (animation.dataset.isHiding) return
    else animation.dataset.isHiding = 'true'

    const diff = performance.now() - Number(animation.dataset.activated)
    const delay = Math.max(250 - diff, 0)

    setTimeout(() => {
      animation.classList.remove('v-ripple__animation--in')
      animation.classList.add('v-ripple__animation--out')

      setTimeout(() => {
        if (ripples.length === 1 && el.dataset.previousPosition) {
          el.style.position = el.dataset.previousPosition
          delete el.dataset.previousPosition
        }

        if (animation.parentNode.parentNode === el)
          el.removeChild(animation.parentNode)
      }, 300)
    }, delay)
  }
}

function rippleShow(e) {
  const element = e.currentTarget

  if (!element._ripple || element._ripple.touched || e[stopSymbol]) return

  e[stopSymbol] = true

  if (isTouchEvent(e)) {
    element._ripple.touched = true
    element._ripple.isTouch = true
  } else {
    if (element._ripple.isTouch) return
  }

  element._ripple.centered = element.classList.contains('center')
  element._ripple.class = element.classList.contains('custom-class')
    ? 'custom-class'
    : null

  if (isTouchEvent(e)) {
    if (element._ripple.showTimerCommit) return

    element._ripple.showTimerCommit = () => {
      ripples.show(e, element)
    }
    element._ripple.showTimer = window.setTimeout(() => {
      if (element._ripple.showTimerCommit) {
        element._ripple.showTimerCommit()
        element._ripple.showTimerCommit = null
      }
    }, DELAY_RIPPLE)
  } else {
    ripples.show(e, element)
  }
}

function rippleStop(e) {
  e[stopSymbol] = true
}

function rippleHide(e) {
  const element = e.currentTarget

  if (!element._ripple) return

  window.clearTimeout(element._ripple.showTimer)

  if (e.type === 'touchend' && element._ripple.showTimerCommit) {
    element._ripple.showTimerCommit()
    element._ripple.showTimerCommit = null

    element._ripple.showTimer = window.setTimeout(() => {
      rippleHide(e)
    })
    return
  }

  window.setTimeout(() => {
    element._ripple.touched = false
  })
  ripples.hide(element)
}

function rippleCancelShow(e) {
  const element = e.currentTarget

  if (!element._ripple) return

  if (element._ripple.showTimerCommit) {
    element._ripple.showTimerCommit = null
  }

  window.clearTimeout(element._ripple.showTimer)
}

let keyboardRipple = false

function keyboardRippleShow(e) {
  if (!keyboardRipple && (e.keyCode === 13 || e.keyCode === 32)) {
    keyboardRipple = true
    rippleShow(e)
  }
}

function keyboardRippleHide(e) {
  keyboardRipple = false
  rippleHide(e)
}

function focusRippleHide(e) {
  if (keyboardRipple) {
    keyboardRipple = false
    rippleHide(e)
  }
}

const button = document.getElementById('myButton')

button.classList.add('ripple-enabled')
button.addEventListener('touchstart', rippleShow, { passive: true })
button.addEventListener('touchend', rippleHide, { passive: true })
button.addEventListener('touchmove', rippleCancelShow, { passive: true })
button.addEventListener('touchcancel', rippleHide)

button.addEventListener('mousedown', rippleShow)
button.addEventListener('mouseup', rippleHide)
button.addEventListener('mouseleave', rippleHide)

button.addEventListener('keydown', keyboardRippleShow)
button.addEventListener('keyup', keyboardRippleHide)

button.addEventListener('blur', focusRippleHide)

button.addEventListener('dragstart', rippleHide, { passive: true })
