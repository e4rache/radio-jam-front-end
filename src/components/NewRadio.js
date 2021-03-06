import React, { Component } from 'react'
import { Row, Button, Icon } from 'react-materialize'
import Global from '../Global'

const API_URL = Global.API_URL + 'radios/'

class NewRadio extends Component {


    constructor(props) {
        super(props)
        this.state = { radio: {} }
        this.state.radio.description =
            `1 DONNEES GENERALES
1.1 Style :
1.2 Année de fabrication :
1.3 Date d'achat:               Montant :
1.4 Lieu d'achat:
1.5 Tension  AC          DC     
1.6 Schéma   oui    Classement :
                 non
2 TESTS EFFECTUES.
2.1 Résistance enroulement primare TFO
2.2 Contrôle Tensions secondaires TFO : ,
2.3 Contrôle Tensions redressées :


3. FONCTIONNEMENT      OK      Oui       Non

4. PROBLEMES A REGLER
`
    }

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
        const radio = this.state.radio
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