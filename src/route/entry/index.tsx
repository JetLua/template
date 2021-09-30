import {Button} from 'antd'
import {useReducer} from '~/util'

import style from './style.less'

export default React.memo(function() {
  const [state, dispatch] = useReducer({
    count: 0,
    info: {
      name: 'Jet'
    }
  })

  return <section className={style.root}>
    <Button>ok</Button>
  </section>
})
