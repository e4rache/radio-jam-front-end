import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Icon } from 'react-materialize'
import Global from '../Global'

const buttonColor = 'blue-grey darken-4'

const Navigation = () => (
  <div>
    <div className='row grey darken-3 '>

      <Link className='darken-2 col s12 m4' to='/radios/'>
        <Button className={`${buttonColor} hoverable z-depth-5`} waves='light'>
          Radios
              <Icon small left>
            radio
              </Icon>
        </Button>
      </Link>

      <Link className='darken-2 col s12 m4' to='/tubes/'>
        <Button className={`${buttonColor} hoverable z-depth-5`} waves='light'>
          Tubes
              <Icon small left>
            settings_input_svideo
              </Icon>
        </Button>
      </Link>

      <Link className='darken-2 col s12 m4' to='/login/'>
        <Button className={`${Global.JWT ? buttonColor : 'red'} hoverable z-depth-5`} waves='light'>
          Login
              <Icon small left>
            account_box
              </Icon>
        </Button>
      </Link>

    </div>
  </div>
)



export default Navigation;
