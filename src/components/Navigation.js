import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Icon } from "react-materialize";

class Navigation extends Component {
  state = {};
  render() {
    return (
      <div className="row">
        <Link className="col s12 m3" to="Radios">
          <Button waves="light">
            Radios
            <Icon small left>
              radio
            </Icon>
          </Button>
        </Link>
        <Link className="col s12 m3" to="Tubes">
          <Button waves="light">
            Tubes
            <Icon small left>
              settings_input_svideo
            </Icon>
          </Button>
        </Link>
        <Link className="col s12 m3" to="login">
          <Button waves="light">
            Login
            <Icon small left>
              account_box
            </Icon>
          </Button>
        </Link>
      </div>
    );
  }
}

export default Navigation;
