import React, { Component } from "react";
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
      console.log("0000000000000000000");
      let radioArray = await api_call.json();
      console.log("Radios.loadRadios() radioArray", radioArray);
      radioArray = radioArray.radios;
      console.log("Radios.loadRadios() - radioArray", radioArray);
      this.setState({ radioArray, isLoading: false });
    } catch (error) {
      console.log("Radios.loadRadios() - error", error);
    }
  };

  componentDidMount = () => {
    console.log("conponentDidMount()");
    this.loadRadios();
  };

  render() {
    const { radioArray, isLoading } = this.state;
    if (isLoading) {
      return <Loader />;
    } else {
      return (
        <div>
          <Collection className="row red-text z-depth-2" header="Radios">
            {radioArray.map(radio => {
              return (
                <CollectionItem className="col" key={radio._id}>
                  <div className="col s2">
                    <Card className="green lighten-2 black-text">
                      {radio.name}
                    </Card>
                  </div>
                  <div className="black-text col s10">{radio.brand}</div>
                  <div className="black-text col s10">{radio.model}</div>
                  <div className="black-text col s10">{radio.description}</div>
                </CollectionItem>
              );
            })}
          </Collection>
          <Button
            className="grey z-depth-2"
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
