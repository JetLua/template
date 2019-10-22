import {stage} from './core'

const square = new PIXI.Graphics()
  .beginFill(0xffcc33)
  .drawRect(0, 0, 100, 100)
  .endFill()

stage.addChild(square)