import {animate, linear} from 'popmotion'
import {Howl} from 'howler'

import {stage, screen, ticker} from '~/core'
import {preload} from './scene'
import Gradient from '~/filter/gradient'
import RadialGradient from '~/filter/radialGradient'
import {qrc} from './util'

const PI2 = Math.PI * 2

let lyric: ReturnType<typeof qrc>

await preload()


import('@/static/sound/山水之间.txt').then(m => {
  lyric = qrc(m.default)
})

const bgm = new Howl({
  src: 'static/sound/山水之间.mp3',
  autoplay: true,
  loop: true,
  // volume: 0
})

let row: typeof lyric['rows'][number]

const radialGradient = new RadialGradient(0xff5722, 0xffc107)


const tape = PIXI.Sprite.from('tape.png')
tape.filters = [radialGradient]
tape.position.set(screen.width / 2, screen.height / 2)
tape.scale.set(Math.min((screen.width - 60) / tape.width, screen.height / tape.height, 1))
stage.addChild(tape)

const title = new PIXI.Text('山水之间 - 许嵩', {
  fill: 0xffffff,
  fontSize: 36,
  fontWeight: 'bold',
  fontFamily: 'ping'
})

title.anchor.set(.5)
title.position.set(0, -135)
tape.addChild(title)


const leftGear = PIXI.Sprite.from('gear.png')
leftGear.position.set(-150, -15)
tape.addChild(leftGear)

const rightGear = PIXI.Sprite.from('gear.png')
rightGear.position.set(140, -15)
tape.addChild(rightGear)


ticker.add(() => {
  if (!lyric) return

  const t = Math.round(bgm.seek() as number * 1000)

  if (row) {
    const word = row.getWord(t)

    if (word) {
      const {mask, ranges: [begin, end]} = word

      let p = +((t - begin) / (end - begin)).toFixed(2)
      if (Math.abs(1 - p) < .05) p = 1
      const _mask = mask._mask as PIXI.Graphics
      _mask.x = mask.width * (p - 1)
    }

    if (t < row.ranges[1]) return
  }

  row?.parent.removeChild(row)
  row = lyric.getRow(t)
  if (!row) return
  row.position.set(screen.width / 2, screen.height / 2 - tape.height / 2 - 10)
  row.pivot.set(row.width / 2, 0)
  stage.addChild(row)
})


animate({
  from: 0,
  to: Math.PI * 2,
  duration: 5e3,
  repeat: Infinity,
  repeatType: 'loop',
  ease: linear,
  onUpdate: v => {
    leftGear.rotation =
    rightGear.rotation = v
  }
})


/* 渐变背景 */
{
  const colors = [
    0x7cb7d3, 0x5ccdb1,
    0x255a6d, 0x99e550,
    0x8e3c4f, 0xdfa782,
    0x10177e, 0x9d37a2,
  ]

  const gradient = new Gradient(colors[0], colors[1])

  stage.filterArea = screen
  stage.filters = [gradient]

  ticker.add(() => {
    gradient.t += .015
    gradient.t %= PI2
  })
}
