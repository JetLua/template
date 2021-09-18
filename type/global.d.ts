declare module '*.less'

declare const React = await import('react')
declare const ReactDOM = await import('react-dom')

declare const ENV: 'prod'
declare const PROD: boolean

type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>
}

// 路由格式
interface IRoute {
  path?: string
  name?: string
  exact?: boolean
  /** for sidebar */
  parent?: this
  routes?: this[]
  /**
   * Element: 左侧栏显示的菜单
   * Boolean: 是否在左侧菜单栏中显示
   */
  menu?: JSX.Element | boolean
  component?: React.FunctionComponent
}
