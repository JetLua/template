import {useReducer} from '~/util'

import App from './app'
import Head from './head'
import News from './news'
import Notice from './notice'
import Banner from './banner'
import Calendar from './calendar'
import Workflow from './workflow'
import Institution from './institution'

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
        <News style={{marginTop: "var(--gap)"}}/>
        <App style={{marginTop: "var(--gap)"}}/>
      </div>

      <div className={style.right}>
        <Calendar/>
        <Institution style={{marginTop: "var(--gap)"}}/>
      </div>
    </section>
  </section>
})
