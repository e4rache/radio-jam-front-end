import React, { Component } from 'react'
import { Button, Icon, Row } from 'react-materialize'

import Loader from './Loader'
import Global from '../Global'

const API_URL = Global.API_URL + 'users/login/'

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      failedLogin: false,
      isLoading: false
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  loginOnClick = async e => {
    this.setState({ isLoading: true })
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
    if (Global.JWT) {
      this.props.history.push('/radios')
    } else {
      this.setState({ failedLogin: true, isLoading: false })
    }

    console.log('Login.loginOnClick - Global.JWT', Global.JWT)
    console.log('Login.loginOnClick - res', res)
  }

  render() {
    const { email, password } = this.state
    return (
      <div>
        {this.state.isLoading ? <Loader /> : null}

        {this.state.failedLogin ? <h6 className="red-text">login failed. please retry.</h6> : <h5 className='grey-text'>Login</h5>}

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
            className='green darken-2 hoverable'
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
