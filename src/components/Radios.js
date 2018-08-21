import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Icon, Card, Button, Collection, CollectionItem } from 'react-materialize'
import Loader from './Loader'
import Global from '../Global'

const API_URL = Global.API_URL + 'radios/'

class Radios extends Component {

  state = {
    radioArray: undefined,
    isLoading: true
  }

  deleteRadio = async (id) => {
    console.log('Radios.deleteRadio(id) - id', id)
    const api_call = await fetch(`${API_URL}/${id}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': `Bearer ${Global.JWT}`
        },
        method: "DELETE"
      }
    )
    const result = await api_call.json()
    console.log('Radios.deleteRadio(id) - result', result)
    this.loadRadios()
  }

  loadRadios = async () => {
    console.log('Radios.loadRadios() - about to fetch()')
    try {
      const api_call = await fetch(`${API_URL}`)
      let radioArray = await api_call.json()
      radioArray = radioArray.radios
      //console.log("Radios.loadRadios() - radioArray", radioArray)
      this.setState({ radioArray, isLoading: false })
    } catch (error) {
      console.log('Radios.loadRadios() - error', error)
    }
  }

  componentDidMount = async () => {
    console.log('Radios.componentDidMount()')
    await this.loadRadios();
  }

  render = () => {
    console.log('Radios.render()')
    const { radioArray, isLoading } = this.state;
    console.log('Radios.render(), radioArray', radioArray)
    if (isLoading) {
      return <Loader />
    } else {
      return (

        <div>

          <div className='col s12 grey-text'>
            <h5>Radios</h5>
            <Link className='col s12 m4 hoverable' to='/newradio/'>
              <Button className='blue-grey darken-4' waves='light'>
                add a radio
              <Icon small left>
                  add
              </Icon>
              </Button>
            </Link>
            <div className='col s12' style={{height:'10px'}}/>
          </div>

          <div className='row'>
            {radioArray.map(radio => {
              return (
                <div key={radio._id} className='col s12'>

                  <div style={{height:'10px'}} />
                  <div
                    className='grey darken-3 col s12'
                    key={radio._id}
                    style={{border:'1px solid white',borderRadius:'2px'}}
                  >
                    
                    <div className='col s6'>
                      <Link to={{ pathname: `/radios/${radio._id}` }} >
                        <Card className='orange darken-3 black-text hoverable'>
                          {radio.name}
                        </Card>
                      </Link>
                    </div>
                    <div className='col s4'/>
                    <div className='col s1' >
                      <div style={{height:'20px'}}/>
                                         
                      <Button
                        className='red hoverable'
                        style={{verticalAlign: 'middle'}}
                        onClick={e => (this.deleteRadio(radio._id))}>
                          <Icon small >
                          delete
                          </Icon>
                      </Button>
                    </div>

                    <span className='black white-text col s12' style={{textAlign:'left'}}>
                      {radio.brand} - {radio.model}
                    </span>
                    
                    <span className='white-text col s12'>
                      
                    </span>

                    <div className='grey darken-2 white-text col s12 z-depth-1'>
                      <div>
                        <textarea
                          className='
                            materialize-textarea
                            white-text
                            ' 
                          disabled 
                          style={{ 
                            height: '10em', 
                            padding: '10px' 
                          }} 
                          value={radio.description}
                        />
                      </div>
                      
                    </div>
                    <div className='col s12'style={{height:'10px'}} />
                  </div>

                </div>
              )
            })}
          </div>
          {/**
          <Button
            className='blue-grey darken-4 z-depth-2'
            onClick={this.loadRadios}
            waves='light'
          >
            Reload
          </Button>
          **/}
        </div>
      )
    }
  }
}

export default Radios
