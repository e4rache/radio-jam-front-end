import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Icon } from "react-materialize";

class Navigation extends Component {
  state = {};
  render() {
    const buttonCollor = "blue-grey darken-4";
    return (
      <div>
        <div className="row grey darken-3 ">
          <Link className="col s12 m4" to="Radios">
            <Button className={`${buttonCollor}`} waves="light">
              Radios
              <Icon small left>
                radio
              </Icon>
            </Button>
          </Link>
          <Link className="col s12 m4" to="Tubes">
            <Button className={`${buttonCollor}`} waves="light">
              Tubes
              <Icon small left>
                settings_input_svideo
              </Icon>
            </Button>
          </Link>
          <Link className="col s12 m4" to="login">
            <Button className={`${buttonCollor}`} waves="light">
              Login
              <Icon small left>
                account_box
              </Icon>
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Navigation;
