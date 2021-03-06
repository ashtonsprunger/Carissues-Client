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
  year: string;
  title: string;
  issue: string;
  token: string;
  id: number;
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

class UpdateIssue extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    let today = new Date();
    let year = today.getFullYear();
    this.state = {
      make: this.props.make,
      model: this.props.model,
      year: this.props.year,
      title: this.props.title,
      issue: this.props.issue,
      isOpen: false,
      thisYear: year.toString(),
    };
    this.setTheMake = this.setTheMake.bind(this);
    this.setTheModel = this.setTheModel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.close = this.close.bind(this);
  }

  close() {
    this.setState({
      isOpen: false,
      make: this.props.make,
      model: this.props.model,
      year: this.props.year,
      title: this.props.title,
      issue: this.props.issue,
    });
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
    let url = `https://carissues-server.herokuapp.com/api/admin/${this.props.id}`;
    console.log(url);
    console.log("make:", this.state.make);
    console.log("model:", this.state.model);
    console.log("title:", this.state.title);
    console.log("issue:", this.state.issue);
    console.log("year:", this.state.year);
    fetch(url, {
      method: "PUT",
      body: JSON.stringify({
        make: this.state.make,
        model: this.state.model,
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
          className="linkButton editButton"
          onClick={() => this.setState({ isOpen: true })}
        >
          edit
        </a>
        <Modal isOpen={this.state.isOpen}>
          <ModalHeader>Edit issue</ModalHeader>
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
                Update!
              </Button>
              <Button onClick={this.close} color="warning" type="button">
                Cancel
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

export default UpdateIssue;
