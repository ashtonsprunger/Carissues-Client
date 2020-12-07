import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";

type PropsType = {
  token: any;
  setToken: (token: any) => void;
  fetchResults: () => void;
};

type StateType = {
  isOpen: boolean;
  email: string;
  password: string;
};

class Login extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      isOpen: false,
      email: "",
      password: "",
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(e: any) {
    e.preventDefault();
    fetch("https://carissues-server.herokuapp.com/api/user/login", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.token) {
          this.props.setToken(json.token);
          this.setState({
            isOpen: false,
            email: "",
            password: "",
          });
        } else {
          alert("Incorrect username or password!");
        }
      })
      .then(this.props.fetchResults)
      .catch(() => alert("Incorrect username or password!"));
  }

  render() {
    return (
      <>
        <a
          className="linkButton"
          onClick={() => this.setState({ isOpen: true })}
        >
          Login
        </a>
        <Modal isOpen={this.state.isOpen}>
          <ModalHeader>Login</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleLogin}>
              <FormGroup>
                <Label htmlFor="loginEmail">Email</Label>
                <Input
                  placeholder="email"
                  required
                  type="email"
                  id="loginEmail"
                  value={this.state.email}
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="loginPassword">Password</Label>
                <Input
                  placeholder="password"
                  required
                  type="password"
                  id="loginPassword"
                  value={this.state.password}
                  onChange={(e) => this.setState({ password: e.target.value })}
                />
              </FormGroup>
              <Button className="firstButton" color="success" type="submit">
                Login!
              </Button>
              <Button
                type="button"
                onClick={() => this.setState({ isOpen: false })}
                color="warning"
              >
                Cancel
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

export default Login;
