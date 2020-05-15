import {stage, screen, renderer} from '~/core'
import {collide, Polygon, Circle} from 'cox'

const hw = screen.width / 2
const hh = screen.height / 2
const tip = new PIXI.Text('', {
  fill: 0xffffff,
  fontSize: 32,
  align: 'center'
})

tip.anchor.set(.5, 1)
tip.position.set(hw, screen.height)

const vertex = {
  square: [-50, -50, 50, -50, 50, 50, -50, 50],
  polygon: [-60, -60, -120, 0, -60, 60, 60, 60, 120, 0, 60, -60]
}

const polygon = new PIXI.Graphics()
  .beginFill(0x00bcd4, .5)
  .drawPolygon(vertex.polygon)
  .endFill()
polygon.name = 'polygon'

const circle = new PIXI.Graphics()
  .beginFill(0xf44336, .5)
  .drawCircle(0, 0, 50)
  .endFill()
circle.name = 'circle'

const square = new PIXI.Graphics()
  .beginFill(0x4caf50, .5)
  .drawPolygon(vertex.square)
  .endFill()

square.name = 'square'

circle.interactive =
square.interactive =
polygon.interactive = true

polygon.position.set(hw, hh - 180)
circle.position.set(hw - 180, hh + 180)
square.position.set(hw + 180, hh + 180)

stage.addChild(polygon, circle, square, tip)

const shape = {
  polygon: new Polygon({
    x: polygon.x,
    y: polygon.y,
    vertices: vertex.polygon
  }),
  circle: new Circle({
    x: circle.x,
    y: circle.y,
    r: 50
  }),
  square: new Polygon({
    x: square.x,
    y: square.y,
    vertices: vertex.square
  })
}


let target, x, y, tips = []
renderer.plugins.interaction.on('pointerdown', e => {
  target = e.target;
  x = e.x
  y = e.y
}).on('pointermove', e => {
  if (!target) return
  target.x += e.x - x
  target.y += e.y - y
  x = e.x
  y = e.y
  const s = shape[target.name]
  s.x = target.x
  s.y = target.y
  tips = []
  collide(shape.polygon, shape.circle) && tips.push('六边形 x 圆')
  collide(shape.polygon, shape.square) && tips.push('六边形 x 正方形')
  collide(shape.square, shape.circle) && tips.push('正方形 x 圆')

  tip.text = tips.join('\n')
}).on('pointerup', () => {
  target = null
})


{
  const polygon = new Polygon({
    x: 10,
    y: 20,
    vertices: [-60, -60, -120, 0, -60, 60, 60, 60, 120, 0, 60, -60]
  })

  const circle = new Circle({
    x: 60,
    y: 60,
    r: 50
  });
  console.log(collide(polygon, circle))
}
