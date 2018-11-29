import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import 'sanitize.css'

import App from './views'
import * as serviceWorker from './serviceWorker'

const render = () => {
  ReactDOM.render(
    <Router>
      <App />
    </Router>,
    document.getElementById('root')
  )
}

if (module.hot) {
  module.hot.accept('./App', render)
}

render()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app
serviceWorker.unregister()
