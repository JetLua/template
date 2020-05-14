import {stage, screen, renderer, ticker} from '~/core'

const {sin, cos, PI} = Math
const {width, height} = screen
const hw = width / 2
const hh = height / 2
const R = 100

const center = new PIXI.Graphics()
  .lineStyle(2, 0xffcc33, 0)
  .drawCircle(0, 0, R)

center.position.set(hw, hh)

stage.addChild(center)

class Circle extends PIXI.Graphics {
  #rad = 0

  constructor(r, rad, color) {
    super()

    this.r = r
    this.rad = rad
    this.#rad = rad

    this
      .lineStyle(2, 0xffffff, .2)
      .drawCircle(0, 0, r)

    const dot = new PIXI.Graphics()
      .beginFill(color)
      .drawCircle(0, 0, 5)
      .endFill()

    dot.position.set(
      cos(rad) * r,
      sin(rad) * r
    )

    this.dot = dot
    this.addChild(dot)

    ticker.add(this.loop.bind(this))
  }

  reset() {
    this.rad = this.#rad
  }

  loop() {
    const {dot, rad, r} = this
    dot.position.set(
      cos(rad) * r,
      sin(rad) * r
    )
    dot.visible = true
    this.rad -= .05
  }
}

let i = 0
const colors = [
  0x00bcd4,
  0xf44336
]

renderer.plugins.interaction.on('pointerdown', () => {
  if (i > 3.14) return

  const a = new Circle(R * 1.2, -i, mix(...colors, i / 3.14))
  const b = new Circle(R * 1.2, -PI - i, mix(...colors, 1 - i / 3.14))
  center.addChild(a, b)
  a.position.set(
    cos(i) * R * .8,
    sin(i) * R * .8
  )
  b.position.set(
    cos(i) * R * -.8,
    sin(i) * R * -.8
  )

  i += PI / 10

  for (const child of center.children) {
    child.reset()
  }
})

function mix(mini, maxi, t) {
  return mini + (maxi - mini) * t | 0
}