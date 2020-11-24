import React, { Component } from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";

type PropsType = {
  token: string;
  id: number;
  placeholder: string;
};

type StateType = {
  fix: string;
  isOpen: boolean;
};

class PostFix extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = { fix: "", isOpen: false };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e: any) {
    e.preventDefault();
    let id = this.props.id;
    let url = `https://carissues-server.herokuapp.com/api/auth/${id}`;
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        fix: this.state.fix,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.token,
      }),
    }).then((res) => {
      this.setState({ fix: "" });
    });
  }

  render() {
    return (
      <>
        <Form id="fixForm" onSubmit={this.handleSubmit}>
          <Input
            onChange={(e) => this.setState({ fix: e.target.value })}
            value={this.state.fix}
            placeholder={this.props.placeholder}
          />
          <Button color="success" type="submit">
            Post!
          </Button>
        </Form>
      </>
    );
  }
}

export default PostFix;
