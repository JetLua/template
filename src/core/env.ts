import Interaction from '@iro/interaction'

PIXI.settings.SORTABLE_CHILDREN = true
PIXI.settings.PREFER_ENV = PIXI.ENV.WEBGL
PIXI.settings.PRECISION_FRAGMENT = PIXI.PRECISION.HIGH

PIXI.Renderer.registerPlugin('interaction', Interaction)
