import {stage, screen, ticker} from '~/core'

const {sin, cos, PI, random} = Math
const PI2 = PI * 2
const R = 320

class Shape extends PIXI.Graphics {
  #color = random() * 0xffffff | 0
  #time = 30
  #lineWidth = 1

  constructor({count = 3, clockwise = true} = {}) {
    super()
    const delta = PI2 / count
    const vertices = Array.from({length: count}, (_, i) => {
      const p = new PIXI.Point()
      p.set(
        R * sin(delta * i),
        R * cos(delta * i)
      )
      return p
    })
    this.vertices = vertices
    this.lineStyle(this.#lineWidth, this.#color)
    this.drawPolygon(vertices)
  }

  show() {
    let resolve
    const promise = new Promise(_ => resolve = _)
    const {vertices} = this
    const {length} = vertices
    const sides = Array.from(vertices, (current, i) => {
      const last = vertices[i - 1] || vertices[length - 1]
      return Array.from({length: this.#time}, (_, j) => {
        const p = j / (this.#time - 1)
        return new PIXI.Point(
          current.x + (last.x - current.x) * p,
          current.y + (last.y - current.y) * p,
        )
      })
    })

    let i = 0
    let last = 0
    const tick = () => {
      const now = performance.now()
      if (now - last < 40) return
      last = now
      if (i === this.#time) {
        ticker.remove(tick)
        return resolve()
      }
      sides.forEach((side, j) => {
        const last = sides[j - 1] || sides[length - 1]
        this.line(side[i], last[i])
      })
      i++
    }

    ticker.add(tick)

    return promise
  }

  hide() {
    let resolve
    const promise = new Promise(_ => resolve = _)

    let last = 0

    const tick = () => {
      if (!this.children.length) {
        ticker.remove(tick)
        return resolve()
      }
      const now = performance.now()
      if (now - last < 40) return
      last = now
      for (const child of this.children.splice(-this.vertices.length)) child.destroy({children: true})
    }

    ticker.add(tick)

    return promise
  }

  line(p, q) {
    const line = new PIXI.Graphics()
      .lineStyle(this.#lineWidth, this.#color)
      .moveTo(p.x, p.y)
      .lineTo(q.x, q.y)
    this.addChild(line)
  }
}

!async function() {
  let count = 3
  while (true) {
    const shape = new Shape({count})
    shape.position.set(screen.width / 2, screen.height / 2)
    stage.addChild(shape)
    await shape.show()
    await shape.hide()
    shape.destroy({children: true})
    count++
  }
}()
