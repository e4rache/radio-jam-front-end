import React, { Component } from 'react'
import { Row, Button, Icon } from 'react-materialize'
import Global from '../Global'

const API_URL = Global.API_URL + 'radios/'

class NewRadio extends Component {
    state = { radio: undefined }

    saveRadio = async () => {
        const radio = this.state.radio
        console.log('NewRadio.saveRadio() - radio', radio)
        const api_call = await fetch(`${API_URL}`,
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `bearer ${Global.JWT}`
                },
                method: 'POST',
                body: JSON.stringify(radio)
            })
        const result = await api_call.json()
        console.log('NewRadio.saveRadio() - result', result)
        this.props.history.push("/radios");
    }

    saveOnClick = (e) => {
        console.log("NewRadio.saveOnClick(e)")
        this.saveRadio()
    }

    cancelOnClick = (e) => {
        console.log("NewRadio.cancelOnClick(e)")
    }

    onChange = e => {
        let radio = { ...this.state.radio };
        radio[e.target.name] = e.target.value;
        this.setState({
            radio
        });
        //console.log("NewRadio.change(e) - this.state", this.state);
    };

    render() {
        const radio = {}
        return (
            <div className="">
                <span>New Radio</span>
                <Row>
                    <div className="input-field col s12">
                        <input
                            name="brand"
                            id="brand"
                            type="text"
                            className="grey-text validate"
                            value={radio.brand}
                            onChange={this.onChange}
                        />
                        <label htmlFor="brand">Brand</label>
                    </div>
                    <div className="input-field col s12">
                        <input
                            name="model"
                            id="model"
                            type="text"
                            className="grey-text validate"
                            value={radio.model}
                            onChange={this.onChange}
                        />
                        <label htmlFor="model">Model</label>
                    </div>

                    <div className="input-field col s12">
                        <input
                            name="serialNumber"
                            id="serialNumber"
                            type="text"
                            className="grey-text validate"
                            value={radio.serialNumber}
                            onChange={this.onChange}
                        />
                        <label htmlFor="serialNumber">Serial Number</label>
                    </div>

                    <div className="col s12">
                        <textarea
                            id="description"
                            name="description"
                            className="grey-text validate"
                            style={{ height: "20em" }}
                            onChange={this.onChange}
                            value={radio.description}
                        />
                        <label htmlFor="description">Description</label>
                    </div>
                </Row>
                <Row>
                    <div className="col s6">
                        <Button
                            className="red darken-2"
                            onClick={this.cancelOnClick}
                            waves="light"
                        >
                            Cancel
                <Icon small left>
                                cancel
                </Icon>
                        </Button>
                    </div>
                    <div className="col s6">
                        <Button
                            className="green darken-2"
                            onClick={this.saveOnClick}
                            waves="light"
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

export default NewRadio