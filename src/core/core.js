let {
  devicePixelRatio,
  innerWidth: width,
  innerHeight: height
} = window

const
  ticker = PIXI.Ticker.shared,
  loader = PIXI.Loader.shared,
  stage = new PIXI.Container(),
  design = {width: 1334, height: 750},
  monitor = new PIXI.utils.EventEmitter(),
  pixelRatio = Math.min(2, devicePixelRatio)

const
  renderer = new PIXI.Renderer({
    view: document.querySelector('canvas'),
    antialias: true,
    backgroundColor: 0,
    width: width * pixelRatio,
    height: height * pixelRatio,
  }),

  zoom = {
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
renderer.screen.align = function(node, opt = {}) {
  const
    delta = {x: 0, y: 0},
    rect = node.getBounds(false),
    {top, left, right, bottom} = opt

  if (top !== undefined) {
    delta.y = top - rect.top
  } else if (bottom !== undefined) {
    delta.y = this.height - bottom - rect.bottom
  } else {
    delta.y = (this.height - rect.top - rect.bottom) / 2
  }

  if (left !== undefined) {
    delta.x = left - rect.left
  } else if (right !== undefined) {
    delta.x = this.width - right - rect.right
  } else {
    delta.x = (this.width - rect.left - rect.right) / 2
  }

  node.x += delta.x / node.parent.scale.x
  node.y += delta.y / node.parent.scale.y
}

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