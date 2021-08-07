import merge from 'deepmerge'
import {monitor} from '~/core'

export default create('store', {
  id: null as string,
  level: 0,
  diamond: 3,
  newbie: true,
  name: null as string,
  avatar: null as string,
  gender: null as number,
  settings: {voice: 1, music: 1},
}, true)

export const local = create('local', {})


function create<T>(id: string, data: T, on = false): T {
  let store = data

  try {
    store = merge(store, JSON.parse(localStorage.getItem(id)))
  } catch (err: any) {
    console.log(err.message)
  }

  const queue = new WeakSet()
  const handle = {
    get(target: any, k: any) {
      let v = target[k]
      if (v && typeof v === 'object' && !queue.has(v)) {
        v = target[k] = new Proxy(v, handle)
        queue.add(v)
      }
      return v
    },

    set(target: any, k: any, v: any) {
      if (target[k] === v) return true

      if (v && typeof v === 'object' && !queue.has(v)) {
        v = new Proxy(v, handle)
        queue.add(v)
      }

      target[k] = v
      localStorage.setItem(id, JSON.stringify(store))
      on && monitor.emit(`store:${id}`)
      return true
    }
  }

  return new Proxy(store, handle)
}
