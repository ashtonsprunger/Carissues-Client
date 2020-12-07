import React, { Component } from "react";
import { Link } from "react-router-dom";

import Login from "./login";
import Register from "./register";
import Logout from "./Logout";
import Results from "../Issues/Results";

type PropsType = {
  token: any;
  setToken: (token: string) => void;
  user: any;
  deleteUser: () => void;
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
    this.fetchResults = this.fetchResults.bind(this);
  }

  deleteToken() {
    this.props.setToken("");
    localStorage.clear();
    this.props.deleteUser();
  }

  componentWillMount() {
    this.fetchResults();
  }

  // componentDidUpdate() {
  //   this.fetchResults();
  // }

  fetchResults() {
    let url = "https://carissues-server.herokuapp.com/api/auth";
    console.log(
      "fetchResults url:",
      url,
      "fetchResults token:",
      this.props.token
    );
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
        <Link id="mainLogo" to="/about">
          Carissues
        </Link>
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
              <Login
                fetchResults={this.fetchResults}
                setToken={this.props.setToken}
                token={this.props.token}
              />{" "}
              or{" "}
              <Register
                fetchResults={this.fetchResults}
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
