import React, { Component } from "react";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";

type PropsType = {
  id: number;
  user: any;
  title: string;
  token: string;
};

type StateType = {
  isOpen: boolean;
};

class DeleteIssue extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    let url = `https://carissues-server.herokuapp.com/api/admin/${this.props.id}`;
    fetch(url, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.token,
      }),
    })
      .then((res) => {
        this.setState({ isOpen: false });
      })
      .catch(console.log);
  }

  render() {
    return (
      <>
        <a
          id="deleteButton"
          className="linkButton"
          onClick={() => this.setState({ isOpen: true })}
        >
          delete
        </a>
        <Modal isOpen={this.state.isOpen}>
          <ModalHeader>
            Are you sure you want to delete "{this.props.title}"?
          </ModalHeader>
          <ModalBody>
            <Button
              className="firstButton"
              onClick={this.handleSubmit}
              color="danger"
            >
              Delete
            </Button>
            <Button
              color="warning"
              onClick={() => this.setState({ isOpen: false })}
            >
              Cancel
            </Button>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

export default DeleteIssue;
