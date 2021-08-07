import {loader} from '~/core'
import {createPromise} from '~/util'

export default function() {
  const [promise, resolve] = createPromise()

  loader
    .add('static/texture/ui.json')
    .load(resolve)

  return promise
}
