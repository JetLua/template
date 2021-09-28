declare module '*.vue'
declare const Vue = await import('vue')
declare const Router = await import('vue-router')
declare const cdn: string

declare const wx: {
  config(opts: any): void
  ready(cb: Function): void
  updateTimelineShareData(opts: any): void
  updateAppMessageShareData(opts: any): void
  onMenuShareTimeline(opts: any): void
  onMenuShareAppMessage(opts: any): void
}

interface IEvent {
  x: number
  y: number
  id: number
  stopped: boolean
  target: PIXI.Container
  currentTarget: PIXI.Container
}

type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>
}
