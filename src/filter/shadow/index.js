import vert from './shadow.vert'
import frag from './shadow.frag'

export default class extends PIXI.Filter {
  constructor(...args) {
    super(vert, frag)
  }
}