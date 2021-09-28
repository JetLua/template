import routes from './route'

import './style.less'

const app = Vue.createApp({})
app.use(Router.createRouter({routes, history: Router.createWebHistory()}))
app.mount('.app')
