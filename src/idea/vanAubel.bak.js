import {stage, screen, renderer} from '~/core'

const {sqrt, sign, cos, sin, PI} = Math
const PI_2 = PI / 2
const {width, height} = screen
const hw = width / 2
const hh = height / 2

const points = [
  -100, -100,
  100, -100,
  100, 100,
  -100, 100
]

const dots = Array.from({length: 4}, (_, i) => {
  const dot = new PIXI.Graphics()
    .beginFill(0x2196f3)
    .drawCircle(0, 0, 5)
    .endFill()

  dot.interactive = true
  dot.position.set(hw + points[i * 2], hh + points[i * 2 + 1])

  return dot
})

stage.addChild(...dots)

let target

const self = new PIXI.Graphics()
const center = new PIXI.Graphics()
  .beginFill(0x2196f3)
  .drawCircle(0, 0, 5)
  .endFill()

const top1 = center.clone()
const top2 = center.clone()
const left1 = center.clone()
const left2 = center.clone()
const right1 = center.clone()
const right2 = center.clone()
const bottom1 = center.clone()
const bottom2 = center.clone()

const top = new PIXI.Graphics()
const left = new PIXI.Graphics()
const right = new PIXI.Graphics()
const bottom = new PIXI.Graphics()

stage.addChild(self, center, top1, top2, right1, right2, left1, left2, bottom1, bottom2,
  top, left, right, bottom)

renderer.plugins.interaction.on('pointerdown', ev => {
  target = ev.target
  if (!target) return
  target.down = {x: ev.x, y: ev.y}
}).on('pointermove', ev => {
  if (!target) return
  const {down} = target
  if (!down) return
  target.x += ev.x - down.x
  target.y += ev.y - down.y
  down.x = ev.x
  down.y = ev.y
  self.clear()
  self.lineStyle(2, 0x2196f3)
  for (let i = 0; i < dots.length; i++) {
    const {x, y} = dots[i]
    if (i) self.lineTo(x, y)
    else self.moveTo(x, y)
  }
  self.closePath()
  getExtras()
}).on('pointerup', ev => {
  target = null
})

function getExtras() {
  const cx = (dots[0].x + dots[1].x + dots[2].x + dots[3].x) / 4
  const cy = (dots[0].y + dots[1].y + dots[2].y + dots[3].y) / 4
  center.position.set(cx, cy)

  for (let i = 0; i < dots.length; i++) {
    const p1 = dots[i]
    const p2 = dots[i + 1] || dots[0]

    if (i === 0) {
      top1.position.copyFrom(rotate(p2, p1, -PI_2))
      top2.position.copyFrom(rotate(p1, p2, PI_2))

      top.clear()
      top
        .beginFill(0xff9800)
        .drawPolygon([
          p1.x, p1.y,
          p2.x, p2.y,
          top2.x, top2.y,
          top1.x, top1.y
        ])
        .endFill()
    } else if (i === 1) {
      right1.position.copyFrom(rotate(p2, p1, -PI_2))
      right2.position.copyFrom(rotate(p1, p2, PI_2))
      right.clear()
      right
        .beginFill(0x8bc34a)
        .drawPolygon([
          p1.x, p1.y,
          p2.x, p2.y,
          right2.x, right2.y,
          right1.x, right1.y
        ])
        .endFill()
    } else if (i === 2) {
      bottom1.position.copyFrom(rotate(p2, p1, -PI_2))
      bottom2.position.copyFrom(rotate(p1, p2, PI_2))
      bottom.clear()
      bottom
        .beginFill(0x00bcd4)
        .drawPolygon([
          p1.x, p1.y,
          p2.x, p2.y,
          bottom2.x, bottom2.y,
          bottom1.x, bottom1.y
        ])
        .endFill()
    } else {
      left1.position.copyFrom(rotate(p2, p1, -PI_2))
      left2.position.copyFrom(rotate(p1, p2, PI_2))
      left.clear()
      left
        .beginFill(0xe91e63)
        .drawPolygon([
          p1.x, p1.y,
          p2.x, p2.y,
          left2.x, left2.y,
          left1.x, left1.y
        ])
        .endFill()
    }
  }
}

/**
 * p1绕p2旋转rad弧度(逆时针为负，顺时针为正)后的坐标
 *
 * @param {PIXI.IPoint} p1
 * @param {PIXI.IPoint} p2
 * @param {number} rad 弧度
 */

function rotate(p1, p2, rad) {
  return {
    x: (p1.x - p2.x) * cos(rad) - (p1.y - p2.y) * sin(rad) + p2.x,
    y: (p1.x - p2.x) * sin(rad) - (p1.y - p2.y) * cos(rad) + p2.y,
  }
}

/**
 * @typedef {object} IVec2 二维向量
 * @property {number} x
 * @property {number} y
 */
