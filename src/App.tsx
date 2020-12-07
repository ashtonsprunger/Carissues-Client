import { stringify } from "querystring";
import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Issues from "./Components/Issues/Issues";
import Auth from "./Components/Auth/Auth";
import About from "./Components/About";

type StateType = {
  token: any;
  user: any;
};

type PropsType = {};

class App extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      token: "",
      user: null,
    };
    this.setToken = this.setToken.bind(this);
    this.getToken = this.getToken.bind(this);
    this.getUser = this.getUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  deleteUser() {
    this.setState({ user: null });
    console.log("******* DELETING USER *******");
    console.log(this.state);
  }

  componentWillMount() {
    console.log("TOKEN");
    this.getToken();
    document.title = "Carissues";
  }

  getUser(token: any) {
    fetch("https://carissues-server.herokuapp.com/api/auth/user", {
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: token,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        // console.log('USER:', json)
        this.setState({ user: json });
      })
      .catch((error) => {
        console.log("ERROR:", error);
      });
  }

  getToken() {
    if (typeof localStorage.getItem("token") === "string") {
      this.setState({
        token: localStorage.getItem("token"),
      });
      this.getUser(localStorage.getItem("token"));
    }
  }

  setToken(token: string) {
    localStorage.setItem("token", token);
    this.setState({
      token: token,
    });
    this.getUser(this.state.token);
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/">
            <div id="wrapper">
              <Auth
                user={this.state.user}
                token={this.state.token}
                setToken={this.setToken}
                deleteUser={this.deleteUser}
              />
              <Issues user={this.state.user} token={this.state.token} />
            </div>
          </Route>
          <Route>
            <h1>Oops!! We can't find that page!</h1>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
<div>
  Icons made by{" "}
  <a href="https://www.flaticon.com/authors/those-icons" title="Those Icons">
    Those Icons
  </a>{" "}
  from{" "}
  <a href="https://www.flaticon.com/" title="Flaticon">
    www.flaticon.com
  </a>
</div>;
