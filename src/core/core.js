let {
  devicePixelRatio,
  innerWidth: width,
  innerHeight: height
} = window

const ticker = PIXI.Ticker.shared
const loader = PIXI.Loader.shared
const stage = new PIXI.Container()
const design = {width: 1334, height: 750}
const monitor = new PIXI.utils.EventEmitter()
const pixelRatio = Math.min(2, devicePixelRatio)

const renderer = new PIXI.Renderer({
  view: document.querySelector('canvas'),
  antialias: true,
  transparent: false,
  backgroundColor: 0x333333,
  width: width * pixelRatio,
  height: height * pixelRatio,
})

const zoom = {
  mix: [],
  get max() { return Math.max(...this.mix) },
  get min() { return Math.min(...this.mix) }
}

zoom.mix = [
  renderer.screen.width / design.width,
  renderer.screen.height / design.height
]

ticker.add(() => renderer.render(stage))

renderer.plugins.accessibility.destroy()

export const screen = renderer.screen
export const device = {width, height, pixelRatio: devicePixelRatio}

export {
  zoom,
  stage,
  design,
  loader,
  ticker,
  monitor,
  renderer,
  pixelRatio
}