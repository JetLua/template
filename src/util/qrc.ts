import catmull from './catmull'

let rows = []

export default function(raw: string) {
  return new Qrc(raw)
}


class Qrc {
  rows: Row[]

  constructor(raw: string) {
    this.rows = raw.split('\n').filter(item => item.trim()).map(row => new Row(row))
  }

  getRow(t: number) {
    for (const row of this.rows) {
      const {ranges} = row
      if (t >= ranges[0] && t <= ranges[1]) return row
    }
  }
}

class Row extends PIXI.Container {
  ranges: [number, number]
  words: Word[]
  watermelon: PIXI.Sprite

  catmull: (t: number) => {x: number, y: number}

  constructor(raw: string) {
    super()

    const exp1 = /\[(\d+),(\d+)\]/
    const exp2 = /(.*?)\((\d+),(\d+)\)/g

    let matches = raw.match(exp1)

    if (matches) {
      const begin = +matches[1]
      const duration = +matches[2]
      this.ranges = [begin, begin + duration]
    }

    raw = raw.replace(exp1, '')

    const gap = 10

    let x = 0

    const points: {x: number, y: number}[] = []

    while ((matches = exp2.exec(raw))) {
      const word = matches[1]
      const begin = +matches[2]
      const duration = +matches[3]
      this.words = this.words ?? []

      const fontStyle = {
        fill: 0xffffff,
        fontSize: 40,
        fontWeight: 'bold'
      }

      const txt = new PIXI.Text(word, fontStyle as any)

      const mask = new PIXI.Text(word, {
        ...fontStyle,
        fill: 0xffcc33
      } as any)

      const _mask = new PIXI.Graphics()
        .beginFill(0xffcc33)
        .drawRect(0, 0, mask.width, mask.height)
        .endFill()

      _mask.pivot.y = mask.height
      _mask.x = -mask.width

      mask.addChild(_mask)
      mask.mask = _mask

      txt.addChild(mask)

      this.words.push({
        txt, word, mask,
        ranges: [begin, begin + duration]
      })


      txt.anchor.set(0, 1)
      mask.anchor.copyFrom(txt.anchor)
      txt.x = x
      x += txt.width + gap
      this.addChild(txt)
    }
  }

  getWord(t: number) {
    for (let i = 0; i < this.words.length; i++) {
      const word = this.words[i]
      const next = this.words[i + 1]
      const {ranges} = word
      if (t >= ranges[0] && t <= ranges[1]) return word
    }
  }
}

interface Word {
  ranges: [number, number]
  word: string
  txt: PIXI.Text
  mask: PIXI.Text
}
