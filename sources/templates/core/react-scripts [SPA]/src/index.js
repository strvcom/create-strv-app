import React from 'react'
import ReactDOM from 'react-dom'
import Router from 'global/Router'
import registerServiceWorker from 'global/registerServiceWorker'

const MOUNT_NODE = document.getElementById('root')

ReactDOM.render(<Router />, MOUNT_NODE)
registerServiceWorker()
