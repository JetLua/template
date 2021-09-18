import dayjs from 'dayjs'
import {SearchOutlined, BellOutlined, DownOutlined} from '@ant-design/icons'

import {useReducer} from '~/util'
import {context} from '~/util/context'
import {Icon} from '~/module'

import style from './style.less'
import {Avatar, Badge, Dropdown, Menu} from 'antd'


export default React.memo(function() {
  const [state, dispatch] = useReducer({
    get time() {
      const h = dayjs().hour()
      return h < 12 ? '上午好' : '下午好'
    },

    count: 3
  })

  const ctx = React.useContext(context)

  const menu = <Menu>
    <Menu.Item>ok</Menu.Item>
  </Menu>

  return <section className={style.root}>
    <div className={style.left}>
      <Icon type="icon-yige" style={{fontSize: 80}}/>
      <i>{state.time}, {ctx.user.name}</i>
      <i>从未停止对美好事物的探索</i>
    </div>
    <div className={style.right}>
      <SearchOutlined style={{fontSize: 20}} className={style.search}/>
      <Badge count={state.count}><BellOutlined style={{fontSize: 20}}/></Badge>
      <i></i>
      <Dropdown overlay={menu}><div className={style.avatar}><Avatar/><Icon type="icon-xiala"/></div></Dropdown>
    </div>
  </section>
})
