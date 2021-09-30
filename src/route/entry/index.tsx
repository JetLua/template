import {Button} from 'antd'
import {net, useMount, useReducer} from '~/util'

import style from './style.less'

export default React.memo(function() {
  const [state, dispatch] = useReducer({
    count: 0,
    info: {
      name: 'Jet'
    }
  })

  useMount(() => {
    net.get('/fds').then((data) => {
      console.log(data.data.ok)
    })
  })

  return <section className={style.root}>
    <Button>ok</Button>
  </section>
})
