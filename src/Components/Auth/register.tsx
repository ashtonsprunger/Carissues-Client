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
  name: string;
  email: string;
  password: string;
};

class Register extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      isOpen: false,
      name: "",
      email: "",
      password: "",
    };
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleRegister(e: any) {
    e.preventDefault();
    fetch("https://carissues-server.herokuapp.com/api/user/register", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        this.props.setToken(json.token);
        this.setState({ isOpen: false });
      })
      .then(this.props.fetchResults)
      .catch(() => alert("Email already in use!"));
  }

  render() {
    return (
      <>
        <a
          className="linkButton"
          onClick={() => this.setState({ isOpen: true })}
        >
          Register
        </a>
        <Modal isOpen={this.state.isOpen}>
          <ModalHeader>Register</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleRegister}>
              <FormGroup>
                <Label htmlFor="registerName">Name</Label>
                <Input
                  placeholder="name (public)"
                  required
                  id="registerName"
                  value={this.state.name}
                  onChange={(e) => this.setState({ name: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="registerEmail">Email</Label>
                <Input
                  placeholder="email"
                  required
                  type="email"
                  id="registerEmail"
                  value={this.state.email}
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="registerPassword">Password</Label>
                <Input
                  placeholder="password"
                  required
                  type="password"
                  id="registerPassword"
                  value={this.state.password}
                  onChange={(e) => this.setState({ password: e.target.value })}
                />
              </FormGroup>
              <Button className="firstButton" color="success" type="submit">
                Register!
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

export default Register;
