import merge from './merge'

import type {Options} from './merge'

export * as context from './context'
export {default as net} from './net'

export function useMount(cb: Function) {
  const ref = React.useRef<Function>()
  ref.current = cb
  React.useEffect(() => {
    return ref.current()
  }, [])
}


export function useReducer<T>(state: T, opts?: Options) {
  return React.useReducer(
    (state: T, data: RecursivePartial<T> | ((old: T) => RecursivePartial<T>)) => {
      if (data instanceof Function) return merge<T>(state, data(state), opts)
      return merge<T>(state, data, opts)
    },
    state
  )
}

function isObject(o: any) {
  return Object.prototype.toString.call(o) === '[object Object]'
}

export function pureObject(o: any) {
  if (!isObject(o)) return false

  const ctor = o.constructor
  if (ctor == null) return true

  const prot = ctor.prototype
  if (!isObject(prot)) return false

  if (!Object.prototype.hasOwnProperty.call(prot, 'isPrototypeOf')) return false

  return true
}

export function ok<T>(result: T): [T, null] {
  return [result, null]
}

export function error(err: Error): [null, Error] {
  return [null, err]
}
