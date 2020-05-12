import {stage, screen, renderer} from '~/core'

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

stage.addChild(self, center)

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
}