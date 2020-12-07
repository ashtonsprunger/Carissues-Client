import React, { Component } from "react";
import { Button } from "reactstrap";

type PropsType = {
  deleteToken: () => void;
};

type StateType = {};

class Logout extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
  }

  render() {
    return (
      <a
        className="linkButton"
        onClick={() => {
          this.props.deleteToken();
        }}
      >
        Logout
      </a>
    );
  }
}

export default Logout;
