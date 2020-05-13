import {stage, screen, renderer} from '~/core'
import {tween, easing} from 'popmotion'

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
const colors = [0xff9800, 0x8bc34a, 0x00bcd4, 0xe91e63]

const dots = Array.from({length: 4}, (_, i) => {
  const dot = new PIXI.Graphics()
    .beginFill(0x2196f3)
    .drawCircle(0, 0, 5)
    .endFill()

  dot.interactive = true
  dot.hitArea = new PIXI.Circle(0, 0, 20)
  dot.position.set(hw + points[i * 2], hh + points[i * 2 + 1])
  tween({
    from: {scale: 1, alpha: 1},
    to: {scale: 3, alpha: .5},
    yoyo: Infinity,
    duration: 1e3,
    ease: easing.easeInOut
  }).start(v => {
    dot.alpha = v.alpha
    dot.scale.set(v.scale)
  })
  return dot
})

const squares = [
  new PIXI.Graphics(), // top
  new PIXI.Graphics(), // right
  new PIXI.Graphics(), // bottom
  new PIXI.Graphics(), // left
]

const lines = [
  new PIXI.Graphics(),
  new PIXI.Graphics(),
]


stage.addChild(...squares, ...dots, ...lines)
render()


{
  let target

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
    render()
  }).on('pointerup', ev => {
    target = null
  })
}

function render() {
  for (let i = 0; i < dots.length; i++) {
    const p1 = dots[i]
    const p2 = dots[i + 1] || dots[0]
    const square = squares[i]

    square
      .clear()
      .beginFill(colors[i], .5)
      .drawPolygon([
        p1.x, p1.y, p2.x, p2.y,
        ...rotate(p1, p2, PI_2),
        ...rotate(p2, p1, -PI_2),
      ])
      .endFill()
  }

  for (let i = 0; i < 2; i++) {
    const line = lines[i]
    const s1 = squares[i].vertexData
    const s2 = squares[i + 2].vertexData
    if (!s1 || !s2) continue
    const sx = (s1[0] + s1[2] + s1[4] + s1[6]) / 4
    const sy = (s1[1] + s1[3] + s1[5] + s1[7]) / 4
    const ex = (s2[0] + s2[2] + s2[4] + s2[6]) / 4
    const ey = (s2[1] + s2[3] + s2[5] + s2[7]) / 4

    line
      .clear()
      .lineStyle(4, colors[i])
      .moveTo(sx, sy)
      .lineTo(ex, ey)
  }
}



/**
 * p1绕p2旋转rad弧度(逆时针为负，顺时针为正)后的坐标
 *
 * @param {PIXI.IPoint} p1
 * @param {PIXI.IPoint} p2
 * @param {number} rad 弧度
 * @returns {number[]}
 */

function rotate(p1, p2, rad) {
  return [
    (p1.x - p2.x) * cos(rad) - (p1.y - p2.y) * sin(rad) + p2.x,
    (p1.x - p2.x) * sin(rad) - (p1.y - p2.y) * cos(rad) + p2.y,
  ]
}
