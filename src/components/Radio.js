import React, { Component } from 'react'
import { Icon, Button, Row } from 'react-materialize'
import Loader from './Loader'
import Global from '../Global'

const API_URL = Global.API_URL + 'radios/'

class Radio extends Component {

  constructor(props) {
    super(props)
    this.state = {
      id: props.match.params.id,
      radio: undefined,
      isLoading: true
    };
  }

  componentDidMount() {
    this.loadRadio(this.state.id)
  }

  componentWillReceiveProps() {
    console.log('Radio.componentWillRecieveProps()')
    this.loadRadio(this.state.id)
  }

  cancelOnClick = e => {
    console.log('Radio.cancelOnClick()')
    this.loadRadio(this.state.id)
  }

  saveOnClick = async e => {
    console.log('Radio.saveOnclick()')
    await this.updateRadio(this.state.id)
    await this.props.history.push('/radios')
  };

  loadRadio = async id => {
    console.log('Radio.loadRadio(id) - about to fetch()')
    try {
      const api_call = await fetch(`${API_URL}${id}`)
      let radio = await api_call.json()
      radio = radio.radio
      console.log('Radio.loadRadio(id) - radio', radio)
      this.setState({ radio, isLoading: false })
    } catch (error) {
      console.log('Radio.loadRadio(id) - error', error)
    }
  }

  updateRadio = async id => {
    const radio = this.state.radio;
    console.log('Radio.updateRadio(id) - radio)', radio)
    console.log('Radio.updateRadio(id) - about to fetch()')
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Global.JWT}`
    }
    console.log('Radio.updateRadio(id) - headers', headers)
    const api_call = await fetch(`${API_URL}${id}`, {
      headers,
      method: 'PATCH',
      body: JSON.stringify(radio)
    })

    let result = await api_call.json()
    console.log('Radio.updateRadio() - result', result)
  }

  onChange = e => {
    let radio = { ...this.state.radio }
    radio[e.target.name] = e.target.value
    this.setState({
      radio
    })
    //console.log('Radio.change(e) - this.state', this.state)
  }

  render() {
    const { radio, isLoading, id } = this.state

    //console.log('Radio.render() - this.state.id', id)
    //console.log('Radio.rander() - this.state.radio', this.state.radio);

    if (isLoading) {
      return <Loader />;
    } else {
      return (
        <div>
          <Row>
            <div className='input-field col s12'>
              <input
                name='brand'
                id='brand'
                type='text'
                className='grey-text validate'
                value={radio.brand}
                onChange={this.onChange}
              />
              <label htmlFor='brand'>Brand</label>
            </div>
            <div className='input-field col s12'>
              <input
                name='model'
                id='model'
                type='text'
                className='grey-text validate'
                value={radio.model}
                onChange={this.onChange}
              />
              <label htmlFor='model'>Model</label>
            </div>

            <div className='input-field col s12'>
              <input
                name='serialNumber'
                id='serialNumber'
                type='text'
                className='grey-text validate'
                value={radio.serialNumber}
                onChange={this.onChange}
              />
              <label htmlFor='model'>Serial Number</label>
            </div>



            <div className='input-field col s12 '>
              <textarea
                id='description'
                name='description'
                className='grey-text __materialize-textarea validate'
                style={{ height: '20em' }}
                onChange={this.onChange}
                value={radio.description}
              />
              {/*
              <label htmlFor='description active'>Description</label>
              */}
            </div>
          </Row>
          <Row>
            <div className='col s6'>
              <Button
                className='red darken-2 hoverable'
                onClick={this.cancelOnClick}
                waves='light'
              >
                Cancel
                <Icon small left>
                  cancel
                </Icon>
              </Button>
            </div>
            <div className='col s6'>
              <Button
                className='green darken-2 hoverable'
                onClick={this.saveOnClick}
                waves='light'
              >
                Save
                <Icon small left>
                  check
                </Icon>
              </Button>
            </div>
          </Row>
        </div >
      )
    }
  }
}

export default Radio
