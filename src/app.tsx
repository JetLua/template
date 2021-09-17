import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {hot} from 'react-hot-loader/root'
import routes from './route'

import style from './style.less'

!PROD && hot(App)

ReactDOM.render(
  <App/>,
  document.querySelector('.layout')
)

function App() {
  return <section>
    <Router><Switch>
      {
        routes.map((item, i) => {
          return <Route path={item.path} component={hot(item.component)} key={i}/>
        })
      }
    </Switch></Router>
  </section>
}
