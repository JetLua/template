declare module '*.less'

declare const React = await import('react')
declare const ReactDOM = await import('react-dom')

declare const ENV: 'prod'
declare const PROD: boolean

type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>
}
