import {collide, Polygon, Circle} from 'cox'


const shapes = []

function addPolygon(x, y, vertices) {
  const shape = new Polygon({
    x, y, vertices
  })

  shapes.push(shape)
}

function addCircle(x, y, r) {
  const shape = new Circle({x, y, r})
}
