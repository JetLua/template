import merge from 'deepmerge'

class Store<T extends Record<string, any>> extends PIXI.utils.EventEmitter {
  data: T = {} as T
  #id: string

  constructor(id: string, data: T) {
    super()
    this.#id = id
    this.data = data
  }

  set(data: RecursivePartial<T>) {
    this.data = merge(this.data, data as Partial<T>, {
      arrayMerge: (_, source) => source
    })
    this.emit('change')
    localStorage.setItem(this.#id, JSON.stringify(this.data))
  }
}

function init<T>(id: string, data: T): [string, T] {
  let store = data
  try {
    store = merge(data, JSON.parse(localStorage.getItem(id)))
  } catch (err: unknown) {}
  return [id, store]
}

export default new Store(...init('store:moon', {voice: true, newbie: true, name: ''}))
