import {hot} from 'react-hot-loader/root'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import routes from './route'
import {useReducer, context} from './util'

import './style.less'

!PROD && hot(App)

// memo 嵌套无法触发 hot reload
React.memo = PROD ? React.memo : (...args: Parameters<typeof React.memo>) => args[0] as ReturnType<typeof React.memo>

ReactDOM.render(
  <App/>,
  document.querySelector('.layout')
)

function App() {
  const [state, dispatch] = useReducer({
    ...context.data
  })

  return <context.context.Provider value={{...state, dispatch}}><section className="app">
    <Router><Switch>{map(routes)}</Switch></Router>
  </section></context.context.Provider>
}

function map(routes: IRoute[]) {
  // 拍平路由利于嵌套匹配
  const queue = flat(routes)

  return queue.map((item: IRoute, i: number) => {
    if (!item.path) return
    return <Route key={i} path={item.path} component={item.component} exact={item.exact ?? true}/>
  })
}

function flat(routes: IRoute[]) {
  const queue = []
  for (const route of routes) {
    queue.push(route)
    if (route.routes) queue.push(...flat(route.routes))
  }
  return queue
}

if (navigator.serviceWorker) {
  navigator.serviceWorker.register('/sw.js', {scope: '/'})
    .then(() => console.log('sw.js: done'))
    .catch(() => console.log('sw.js: failed'))
}
