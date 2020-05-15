import {screen, stage, ticker} from '~/core'
import { Point } from 'pixi.js'

const {cos, sin, PI, max, abs, min} = Math
const PI2 = PI * 2
const {width, height} = screen
const hw = width / 2
const hh = height / 2
const R = 100
const R2 = R * 2
const POINT = new PIXI.Point()
const CONFIG = {
  dynamic: {
    speed: 1,
    rotation: 0,
    step: 0,
  },

  tip: {
    speed: 1,
    rotation: 0,
    step: 0,
  },

  get factor() {
    const a = this.dynamic.step * this.dynamic.speed
    const b = this.tip.step * this.tip.speed
    const maxi = max(a, b)
    const mini = min(a, b)
    if (!mini || !maxi) return 1
    return abs(maxi / mini)
  }
}

import('./ui.html').then(data => {
  const control = document.createElement('section')
  control.classList.add('control')
  control.innerHTML = data.default.replace(/>\s+</g, '><')
  document.body.appendChild(control)

  control.querySelector('.circle').addEventListener('change', ev => {
    let v = +ev.target.value
    CONFIG.dynamic.step = v
    v > 0 ? v += 1 : v -= 1
    v < 0 ? v = 1 / -v : 0
    CONFIG.dynamic.speed = v
    console.log(CONFIG)
    reset()
  })
  control.querySelector('.tip').addEventListener('change', ev => {
    let v = +ev.target.value
    CONFIG.tip.step = v
    v > 0 ? v += 1 : v -= 1
    v < 0 ? v = 1 / -v : 0
    CONFIG.tip.speed = v
    console.log(CONFIG)
    reset()
  })
})

import('./ui.less').then(data => {
  const style = document.createElement('style')
  style.innerHTML = data.default.toString()
  document.head.appendChild(style)
})

const fix = new PIXI.Graphics()
  .lineStyle(2, 0x03a9f4, .5)
  .drawCircle(0, 0, R)

fix.position.set(hw, hh)
stage.addChild(fix)

const dynamic = new PIXI.Graphics()
  .lineStyle(2, 0xe91e63, .5)
  .drawCircle(0, 0, R)

dynamic.position.set(R2, 0)

const tip = new PIXI.Graphics()
  .beginFill(0xe91e63)
  .drawCircle(0, 0, 5)
  .endFill()

tip.x = R
dynamic.addChild(tip)

fix.addChild(dynamic)


let last = 0
ticker.add(() => {
  // const factor = max(1 / ratio.tip, ratio.tip / 4) * max(1 / ratio.dynamice, ratio.dynamice / 4)
  // const factor = max(CONFIG.dynamic.speed / CONFIG.tip.speed, CONFIG.tip.speed / CONFIG.dynamic.speed / 2)
  let maxi = max(CONFIG.dynamic.speed, CONFIG.tip.speed) / CONFIG.tip.speed * CONFIG.dynamic.speed
  // console.log(CONFIG.more)
  // if (CONFIG.more) maxi *= 2
  // CONFIG.tip.speed < 1 ? maxi /= CONFIG.tip.speed :
  // CONFIG.tip.speed > 1 ? maxi *= CONFIG.tip.speed / 2 : 0
  if (CONFIG.dynamic.rotation > maxi * PI2) return
  CONFIG.dynamic.rotation += .01 * CONFIG.dynamic.speed
  CONFIG.tip.rotation += .01 * CONFIG.tip.speed

  dynamic.x = cos(CONFIG.dynamic.rotation) * R2
  dynamic.y = sin(CONFIG.dynamic.rotation) * R2
  tip.x = cos(CONFIG.tip.rotation) * R
  tip.y = sin(CONFIG.tip.rotation) * R

  const now = performance.now()

  // if (now - last < 1e2) return
  last = now
  const dot = pool.get()
  dot.position.copyFrom(tip.getGlobalPosition(POINT))
  stage.addChild(dot)
})


function reset() {
  CONFIG.dynamic.rotation =
  CONFIG.tip.rotation = 0
  for (let i = stage.children.length - 1; i > -1; i--) {
    const child = stage.children[i]
    child.name === 'dot' && pool.recycle(child)
  }
}

const pool = {
  dots: [],

  /**
   * @returns {PIXI.Graphics}
   */
  get() {
    const dot = this.dots.pop() || new PIXI.Graphics()
      .beginFill(0xff9800, .5)
      .drawCircle(0, 0, 2)
      .endFill()

    dot.name = 'dot'
    return dot
  },

  /**
   * @param {PIXI.Graphics} dot
   */
  recycle(dot) {
    dot.parent.removeChild(dot)
    this.dots.push(dot)
  }
}
