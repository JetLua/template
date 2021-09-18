import {useReducer} from '~/util'

import Head from './head'
import Notice from './notice'
import Banner from './banner'
import Workflow from './workflow'

import style from './style.less'

export default React.memo(function() {
  const [state, dispatch] = useReducer({
    count: 0,
    info: {
      name: 'Jet'
    }
  })

  return <section className={style.root}>
    <Head/>
    <section className={style.main} style={{marginTop: "var(--gap)"}}>
      <div className={style.left}>
        <div className="d-flex">
          <div>
            <Banner/>
            <Workflow style={{marginTop: "var(--gap)"}}/>
          </div>
          <Notice style={{marginLeft: "var(--gap)"}}/>
        </div>
      </div>

      <div className={style.right}>

      </div>
    </section>
  </section>
})
