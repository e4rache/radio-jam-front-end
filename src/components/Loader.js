import React, { Component } from "react";
import { Row, Col, ProgressBar } from "react-materialize";
class Loader extends Component {
  state = {};
  render() {
    return (
      <div>
        <Row>
          <Col s={12}>
            <ProgressBar className="red" />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Loader;
