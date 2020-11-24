import { stringify } from "querystring";
import React, { Component } from "react";
import "./App.css";

import Issues from "./Components/Issues/Issues";
import Auth from "./Components/Auth/Auth";

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
  }

  componentWillMount() {
    console.log("TOKEN");
    this.getToken();
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
      <div id="wrapper">
        <Auth
          user={this.state.user}
          token={this.state.token}
          setToken={this.setToken}
        />
        <Issues user={this.state.user} token={this.state.token} />
      </div>
    );
  }
}

export default App;
