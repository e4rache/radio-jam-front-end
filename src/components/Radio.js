import React, { Component } from "react";
import { Divider } from "react-materialize";

class Radio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      radio: undefined
    };
  }
  state = {};
  render() {
    console.log("Radio.render() - this.state.id", this.state.id);
    return <div>{}</div>;
  }
}

export default Radio;
