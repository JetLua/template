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
    <div>name: {state.info.name}</div>
    <button onClick={() => dispatch({count: state.count + 1})}>count: {state.count}</button>
    <button onClick={() => dispatch({info: {name: '123'}})}>change name</button>
  </section>
})
