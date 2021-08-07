let {
  innerWidth: width,
  innerHeight: height,
  devicePixelRatio,
} = window
const ticker = PIXI.Ticker.shared
const loader = PIXI.Loader.shared
const stage = new PIXI.Container()
const monitor = new PIXI.utils.EventEmitter()
const pixelRatio = Math.min(2, devicePixelRatio)

const renderer = new PIXI.Renderer({
  view: document.querySelector('canvas'),
  antialias: true,
  backgroundColor: 0x1f2325,
  width: width * pixelRatio,
  height: height * pixelRatio,
})

ticker.add(() => renderer.render(stage), null, PIXI.UPDATE_PRIORITY.UTILITY)

renderer.plugins.accessibility.destroy()
renderer.plugins.interaction.mapPositionToPoint = (point, x, y) => point.set(x * pixelRatio, y * pixelRatio)

export const screen = renderer.screen

export function tick() {
  return new Promise(resolve => {
    renderer.once('postrender', resolve)
  })
}

export {
  stage,
  loader,
  ticker,
  monitor,
  renderer,
  pixelRatio,
  devicePixelRatio,
}
