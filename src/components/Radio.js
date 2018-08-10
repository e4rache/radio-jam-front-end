import React, { Component } from "react";
import { Icon, Button, Row } from "react-materialize";
import { withRouter } from "react-router-dom";
import Loader from "./Loader";

const API_URL = "http://localhost:3000/radios/";

class Radio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      radio: undefined,
      isLoading: true
    };
  }

  componentDidMount() {
    this.loadRadio(this.state.id);
  }
  componentWillReceiveProps() {
    this.loadRadio(this.state.id);
  }
  cancelOnClick = e => {
    console.log("Radio.cancelOnClick()");
    this.loadRadio(this.state.id);
  };

  saveOnClick = e => {
    console.log("Radio.saveOnclick()");
    this.updateRadio(this.state.id);
    this.props.history.push("/radios");
  };

  loadRadio = async id => {
    console.log("Radio.loadRadio(id) - about to fetch()");
    try {
      const api_call = await fetch(`${API_URL}${id}`);
      let radio = await api_call.json();
      radio = radio.radio;
      this.setState({ radio, isLoading: false });
      console.log("Radio.loadRadio(id) - radio", this.state.radio);
    } catch (error) {
      console.log("Radio.loadRadio(id) - error", error);
    }
  };

  updateRadio = async id => {
    const radio = this.state.radio;
    console.log("Radio.updateRadio(id) - radio)", radio);
    console.log("Radio.updateRadio(id) - about to fetch()");
    const api_call = await fetch(`${API_URL}${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "PATCH",
      body: JSON.stringify(radio)
    });

    let result = await api_call.json();
    console.log("Radio.updateRadio() - result", result);
  };

  onChange = e => {
    let radio = { ...this.state.radio };
    radio[e.target.name] = e.target.value;
    this.setState({
      radio
    });
    console.log("Radio.change(e) - this.state", this.state);
  };

  render() {
    const { radio, isLoading, id } = this.state;

    console.log("Radio.render() - this.state.id", id);
    console.log("Radio.rander() - this.state.radio", this.state.radio);

    if (isLoading) {
      return <Loader />;
    } else {
      return (
        <div>
          <Row>
            <div className="input-field col s12 black">
              <input
                name="name"
                id="name"
                type="text"
                className="white validate"
                value={radio.name}
                onChange={this.onChange}
              />
              <label htmlFor="name">Name</label>
            </div>
            <div className="input-field col s12 black">
              <input
                name="brand"
                id="brand"
                type="text"
                className="white validate"
                value={radio.brand}
                onChange={this.onChange}
              />
              <label htmlFor="brand">Brand</label>
            </div>
            <div className="input-field col s12 black">
              <input
                name="model"
                id="model"
                type="text"
                className="white validate"
                value={radio.model}
                onChange={this.onChange}
              />
              <label htmlFor="model">Model</label>{" "}
            </div>
            <div className="white input-field col s12 black">
              <input
                name="description"
                id="description"
                type="textArea"
                className="validate"
                value={radio.description}
                onChange={this.onChange}
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
        </div>
      );
    }
  }
}

export default Radio;
