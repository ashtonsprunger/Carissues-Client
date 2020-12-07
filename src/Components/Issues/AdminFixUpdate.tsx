import React, { Component, useState } from "react";
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
  fix: string;
  token: string;
  id: string;
  fetchResults: () => void;
};

type StateType = {
  fix: string;
  isOpen: boolean;
};

class EditFix extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      fix: this.props.fix,
      isOpen: false,
    };
    this.close = this.close.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  close() {
    this.setState({ isOpen: false, fix: this.props.fix });
  }

  handleSubmit(e: any) {
    e.preventDefault();
    let url = `https://carissues-server.herokuapp.com/api/admin/fixes/${this.props.id}`;
    console.log("Admin Fix Update Url:", url);
    fetch(url, {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.token,
      }),
      body: JSON.stringify({
        fix: this.state.fix,
      }),
    })
      .then((res) => {
        this.setState({ isOpen: false });
        this.props.fetchResults();
      })
      .catch(console.log);
  }

  render() {
    return (
      <>
        <a
          onClick={() => this.setState({ isOpen: true })}
          className="linkButton editButton"
        >
          edit
        </a>
        <Modal isOpen={this.state.isOpen}>
          <ModalHeader>Edit Fix</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label htmlFor="fixEditInput">Fix</Label>
                <Input
                  id="fixEditInput"
                  value={this.state.fix}
                  onChange={(e) => this.setState({ fix: e.target.value })}
                  type="textarea"
                />
              </FormGroup>
              <Button className="firstButton" type="submit" color="success">
                Update!
              </Button>
              <Button type="button" color="warning" onClick={this.close}>
                Cancel
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

export default EditFix;
