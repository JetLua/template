import frag from './gradient.frag'
import vert from './gradient.vert'

export default class extends PIXI.Filter {
  constructor(start: number, end: number, t = 0) {
    super(vert, frag)
    this.uniforms.end = end
    this.uniforms.start = start
  }
}
