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

  componentWillMount = async () => {
    console.log('Radios.componentWillMount()')
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
            <Link className='col s12 m4' to='/newradio/'>
              <Button className='blue-grey darken-4' waves='light'>
                add a radio
              <Icon small left>
                  add
              </Icon>
              </Button>
            </Link>
          </div>
          <Collection className='row z-depth-2'>
            {radioArray.map(radio => {
              return (
                <div key={radio._id}>
                  <CollectionItem
                    className='grey darken-3 col s12'
                    key={radio._id}
                  >

                    <div className='col s4 offset-s4'>
                      <Link to={{ pathname: `/radios/${radio._id}` }} >
                        <Card className='orange darken-3 black-text'>
                          {radio.name}
                        </Card>
                      </Link>
                    </div>
                    <span className='black white-text col s12'>
                      Brand : {radio.brand}
                    </span>
                    <span className='black white-text col s12'>
                      Model : {radio.model}
                    </span>
                    <div className='black white-text col s12'>
                      Description : {radio.description}
                    </div>
                    <Button
                      className='red'
                      onClick={e => (this.deleteRadio(radio._id))}><Icon small >
                        delete
                  </Icon></Button>

                  </CollectionItem>

                </div>
              )
            })}
          </Collection>
          <Button
            className='blue-grey darken-4 z-depth-2'
            onClick={this.loadRadios}
            waves='light'
          >
            Reload
          </Button>
        </div>
      )
    }
  }
}

export default Radios
