import React, { Component } from "react";
import {
  Button,
  Form,
  Input,
  Label,
  FormGroup,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";

import Search from "./Search";

type PropsType = {
  make: string;
  model: string;
  token: string;
};

type StateType = {
  make: string;
  model: string;
  year: string;
  title: string;
  issue: string;
  isOpen: boolean;
  thisYear: string;
};

class PostIssue extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    let today = new Date();
    let year = today.getFullYear();
    this.state = {
      make: this.props.make,
      model: this.props.model,
      year: "",
      title: "",
      issue: "",
      isOpen: false,
      thisYear: year.toString(),
    };
    this.setTheMake = this.setTheMake.bind(this);
    this.setTheModel = this.setTheModel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setTheMake(make: string) {
    this.setState({ make: make });
    // console.log('make:',this.state.make)
  }

  setTheModel(model: string) {
    this.setState({ model: model });
    // console.log('model:',this.state.model)
  }

  handleSubmit(e: any) {
    e.preventDefault();
    let url = `https://carissues-server.herokuapp.com/api/auth/${this.state.make}/${this.state.model}`;
    console.log(url);
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        title: this.state.title,
        issue: this.state.issue,
        year: this.state.year ? this.state.year : null,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.token,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        this.setState({ isOpen: false, year: "", title: "", issue: "" });
      });
  }

  render() {
    return (
      <>
        <a
          className="linkButton"
          id="postLink"
          onClick={() => this.setState({ isOpen: true })}
        >
          Post an issue
        </a>
        <Modal isOpen={this.state.isOpen}>
          <ModalHeader>Post issue</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Search
                  startMake={this.props.make}
                  startModel={this.props.model}
                  allowAll={false}
                  setMake={this.setTheMake}
                  setModel={this.setTheModel}
                />
                {/* </FormGroup>
                            <FormGroup> */}
                <Label htmlFor="postYear">Year</Label>
                <Input
                  placeholder="year"
                  id="postYear"
                  value={this.state.year}
                  onChange={(e) => this.setState({ year: e.target.value })}
                  type="number"
                  min="1886"
                  max={this.state.thisYear.toString()}
                />
              </FormGroup>
              <hr />
              <FormGroup>
                <Label htmlFor="postTitle">Title</Label>
                <Input
                  required
                  placeholder="a brief overview of the issue"
                  id="postTitle"
                  value={this.state.title}
                  onChange={(e) => this.setState({ title: e.target.value })}
                />
                <Label htmlFor="postIssue">Issue</Label>
                <Input
                  required
                  type="textarea"
                  placeholder="describe your issue with greater detail"
                  id="postIssue"
                  value={this.state.issue}
                  onChange={(e) => this.setState({ issue: e.target.value })}
                />
              </FormGroup>
              <Button className="firstButton" color="success" type="submit">
                Post!
              </Button>
              <Button
                onClick={() => this.setState({ isOpen: false })}
                color="warning"
                type="button"
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

export default PostIssue;
