import React from 'react'
import ReactDom from 'react-dom'
import App from './App'
//This is the place where we initialise Redux.
import {Provider} from 'react-redux'
//Importing React Store.
import store from './store/index.js'
import './index.css'
ReactDom.render(
 //Now our App Component Comes under the Provider Component
 //What is the Need of Provider??

 <Provider store={store}>
  <App />,
 </Provider>,
 document.getElementById('root')
)
