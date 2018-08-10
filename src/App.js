import "./App.css";

import React, { Component } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Radios from "./components/Radios";
import Radio from "./components/Radio";
import Tubes from "./components/Tubes";
import Login from "./components/Login";
import Http404 from "./components/Http404";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="grey darken-3 container">
          <br />
          <header>
            <Navigation />
          </header>

          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/radios" component={Radios} exact />
            <Route path="/radios/:id" component={Radio} />
            <Route path="/tubes" component={Tubes} />
            <Route path="/login" component={Login} />
            <Route component={Http404} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
