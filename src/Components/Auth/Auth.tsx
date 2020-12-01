import React, { Component } from "react";

import Login from "./login";
import Register from "./register";
import Logout from "./Logout";
import Results from "../Issues/Results";

type PropsType = {
  token: any;
  setToken: (token: string) => void;
  user: any;
};

type StateType = {
  // registerOpen: boolean,
  // loginOpen: boolean
  results: Array<object>;
};

class Auth extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      results: [],
    };
    this.deleteToken = this.deleteToken.bind(this);
  }

  deleteToken() {
    this.props.setToken("");
    localStorage.clear();
  }

  componentWillMount() {
    this.fetchResults();
  }

  // componentDidUpdate() {
  //   this.fetchResults();
  // }

  fetchResults() {
    let url = "https://carissues-server.herokuapp.com/api/auth";
    fetch(url, {
      headers: new Headers({
        Authorization: this.props.token,
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((json) => this.setState({ results: json }));
  }

  render() {
    return (
      <div id="authWrapper">
        <h1 id="mainLogo">Carissues</h1>
        <div id="authContent">
          {this.props.token ? (
            <>
              {this.props.user
                ? `currently logged in as ${this.props.user.name} ${
                    this.props.user.admin ? "(admin)" : ""
                  } `
                : null}
              <Logout deleteToken={this.deleteToken} />
              <h3>Your Issues:</h3>
              <Results
                showYourIssues={true}
                showUser={false}
                fetchResults={this.fetchResults}
                token={this.props.token}
                user={this.props.user}
                results={this.state.results}
              />
            </>
          ) : (
            <>
              <Login setToken={this.props.setToken} token={this.props.token} />{" "}
              or{" "}
              <Register
                setToken={this.props.setToken}
                token={this.props.token}
              />{" "}
              to post your own issues!
            </>
          )}
        </div>
      </div>
    );
  }
}

export default Auth;
