export {default as createPromise} from './createPromise'
export {default as store} from './store'


export function debounce(cb: (...args: any[]) => void, t: number) {
  let id: number

  return function(...args: any[]) {
    clearTimeout(id)
    id = window.setTimeout(() => cb(...args), t)
  }
}


export function delay(t: number = 0) {
  return new Promise(resolve => {
    setTimeout(resolve, t)
  })
}
