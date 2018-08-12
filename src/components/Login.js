import React, { Component } from 'react'
import { Button, Icon, Row } from 'react-materialize'

import Global from '../Global'

const API_URL = Global.API_URL + 'users/login/'

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  loginOnClick = async e => {
    console.log('Login.loginOnClick - this.state', this.state)
    const { email, password } = this.state
    const body = { email, password }
    let res = await fetch(API_URL, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: 'POST',
      body: JSON.stringify(body)
    })
    res = await res.json()
    Global.JWT = res.token
    console.log('Login.loginOnClick - res', res)
  }

  render() {
    const { email, password } = this.state
    return (
      <div>

        <h5 className='grey-text'>login</h5>

        {/*<Row>*/}

        <div className='input-field col s6'>
          <input
            name='email'
            id='email'
            type='email'
            className='grey-text validate'
            value={email}
            onChange={this.onChange}
          />
          <label htmlFor='email'>Email</label>
        </div>

        <div className='input-field col s6'>
          <input
            id='password'
            name='password'
            type='password'
            className='grey-text validate'
            value={password}
            onChange={this.onChange}
          />
          <label htmlFor='password'>Password</label>
        </div>

        <div className='col s6'>
          <Button
            className='green darken-2'
            onClick={this.loginOnClick}
            waves='light'
          >
            Login
                <Icon small left>
              check
                </Icon>
          </Button>
        </div>

        {/*</Row>*/}

      </div >
    )
  }
}

export default Login
