import "./App.css";

import React, { Component } from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './components/Home'
import Radios from './components/Radios'
import Radio from './components/Radio'
import NewRadio from './components/NewRadio'
import Tubes from './components/Tubes'
import Login from './components/Login'
import Http404 from './components/Http404'

import Global from './Global'

const global = new Global()


class App extends Component {

  constructor() {
    super()
    console.log(Global.TEST_VAR)
  }

  state = {
    loggedinUser: undefined,
    JTW: undefined
  }

  render() {
    return (
      <BrowserRouter>

        <div className='grey darken-3 container'>

          <div><p>{Global.TEST_VAR}</p></div>

          <br />

          <header>
            <Navigation />
          </header>

          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/radios' component={Radios} />
            <Route path='/radios/:id' component={Radio} />
            <Route path='/newradio/' component={NewRadio} />
            <Route path='/tubes' component={Tubes} />
            <Route path='/login' component={Login} />
            <Route component={Http404} />
          </Switch>

        </div>

      </BrowserRouter>
    )
  }
}

export default App
