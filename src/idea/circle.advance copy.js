import {screen, stage, ticker} from '~/core'

const {cos, sin} = Math
const {width, height} = screen
const hw = width / 2
const hh = height / 2
const R = 100
const R2 = R * 2

const center = new PIXI.Graphics()
  .lineStyle(2, 0x03a9f4, .5)
  .drawCircle(0, 0, R)

center.position.set(hw, hh)

const outer = new PIXI.Graphics()
  .lineStyle(2, 0xe91e63, .5)
  .drawCircle(0, 0, R)

outer.rad = 0

const dot = new PIXI.Graphics()
  .beginFill(0xe91e63)
  .drawCircle(0, 0, 5)
  .endFill()

dot.y = -R

outer.addChild(dot)

outer.position.set(R2, 0)
center.addChild(outer)

let last

ticker.add(() => {
  outer.rotation += .02
  outer.x = cos(outer.rotation * 6) * R2
  outer.y = sin(outer.rotation * 6) * R2
  dot.x = cos(outer.rotation * 3) * R
  dot.y = sin(outer.rotation * 3) * R
  const now = performance.now()

  // if (now - last < 50) return

  last = now

  const d = getDot()
  d.position.copyFrom(dot.getGlobalPosition())
  stage.addChild(d)
})


stage.addChild(center)


function getDot() {
  const dot = new PIXI.Graphics()
    .beginFill(0xe91e63)
    .drawCircle(0, 0, 2)
    .endFill()

  return dot
}
