export default function({points}: Options) {
  points.unshift(points[0])
  points.push(points[points.length - 1])

  function* g() {
    for (let i = 0; i + 3 < points.length; i++) {
      yield [
        points[i],
        points[i + 1],
        points[i + 2],
        points[i + 3],
      ]
    }
  }

  const iterator = g()

  let [p1, p2, p3, p4] = iterator.next().value as Point[]

  return function(t: number) {
    if (t === 1) {
      console.log('next')
      const {value, done} = iterator.next()
      if (done) return
      {[p1, p2, p3, p4] = value as Point[]}
      t = 0
    }
    return catmullRom(p1, p2, p3, p4, t)
  }
}

function catmullRom(p1: Point, p2: Point, p3: Point, p4: Point, t: number) {
  return {
    x: calc(p1.x, p2.x, p3.x, p4.x, t),
    y: calc(p1.y, p2.y, p3.y, p4.y, t)
  }
}

function calc(w: number, x: number, y: number, z: number, t: number) {
  return (((-w + 3 * x - 3 * y + z) * t + (2 * w - 5 * x + 4 * y - z)) * t + y - w) * .5 * t + x
}

interface Options {
  points: Point[]
}

interface Point {
  x: number
  y: number
}
