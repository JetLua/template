import merge from './merge'

import type {Options} from './merge'

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
