import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Collection, CollectionItem } from "react-materialize";
import Loader from "./Loader";

const API_URL = "http://localhost:3000/radios";

class Radios extends Component {
  state = {
    radioArray: undefined,
    isLoading: true
  };

  loadRadios = async () => {
    console.log("Radios.loadRadios() - about to fetch()");
    try {
      const api_call = await fetch(`${API_URL}`);
      let radioArray = await api_call.json();
      radioArray = radioArray.radios;
      console.log("Radios.loadRadios() - radioArray", radioArray);
      this.setState({ radioArray, isLoading: false });
    } catch (error) {
      console.log("Radios.loadRadios() - error", error);
    }
  };

  componentDidMount = () => {
    this.loadRadios();
  };

  render() {
    const { radioArray, isLoading } = this.state;
    if (isLoading) {
      return <Loader />;
    } else {
      return (
        <div className="">
          <div className="col s12">
            <h5>Radios</h5>
          </div>
          <Collection className="row z-depth-2">
            {radioArray.map(radio => {
              return (
                <CollectionItem
                  className="grey darken-3 col s12"
                  key={radio._id}
                >
                  <Link to={`/radios/${radio._id}`}>
                    <div className="col s4 offset-s4">
                      <Card className="orange darken-3 black-text">
                        {radio.name}
                      </Card>
                    </div>
                    <span className="black white-text col s12">
                      Brand : {radio.brand}
                    </span>
                    <span className="black white-text col s12">
                      Model : {radio.model}
                    </span>
                    <div className="black white-text col s12">
                      Description : {radio.description}
                    </div>
                  </Link>
                </CollectionItem>
              );
            })}
          </Collection>
          <Button
            className="blue-grey darken-4 z-depth-2"
            onClick={this.loadRadios}
            waves="light"
          >
            Reload
          </Button>
        </div>
      );
    }
  }
}

export default Radios;
