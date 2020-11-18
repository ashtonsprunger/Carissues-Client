import React, { Component } from "react";
import { Button, Form, FormGroup } from "reactstrap";

import Results from "./Results";
import Search from "./Search";
// import PostIssue from "./postIssue";
console.log("hi");

type StateType = {
  results: any;
  token: string;
  make: string;
  model: string;
};

type PropsType = {
  token: string;
  user: any;
};

class App extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      results: [],
      make: "--all--",
      model: "--all--",
      token: this.props.token,
    };
    this.setTheMake = this.setTheMake.bind(this);
    this.setTheModel = this.setTheModel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setResults = this.setResults.bind(this);
  }

  componentWillMount() {
    this.fetchResults();
  }

  setResults(results: any) {
    this.setState({ results: results });
  }

  setTheMake(make: string) {
    this.setState({ make: make });
    // console.log('make:',this.state.make)
  }
  setTheModel(model: string) {
    this.setState({ model: model });
    // console.log('model:',this.state.model)
  }

  componentDidUpdate() {
    console.log(this.state.make + "/" + this.state.model);
  }

  fetchResults() {
    let url = "https://carissues-server.herokuapp.com/api/unauth";
    if (this.state.make !== "--all--") {
      url += `/${this.state.make}`;
      if (this.state.model !== "--all--") {
        url += `/${this.state.model}`;
      }
    }
    console.log(url);
    fetch(url)
      .then((res) => res.json())
      .then(this.setResults);
  }

  handleSubmit(e: any) {
    e.preventDefault();
    this.fetchResults();
  }

  render() {
    return (
      <div id="issuesWrapper">
        <Form onSubmit={this.handleSubmit}>
          <FormGroup className="carSelect">
            <Search
              startMake="--all--"
              startModel="--all--"
              allowAll={true}
              setMake={this.setTheMake}
              setModel={this.setTheModel}
            />
            <div>
              <label htmlFor="issueCarSelectButton">‏‏‎ ‎‎‎</label>
              <Button
                id="issueCarSelectButton"
                className="carSelectButton"
                type="submit"
                color="warning"
              >
                Search!
              </Button>
            </div>
          </FormGroup>
        </Form>
        {/* <PostIssue
          make={this.state.make}
          model={this.state.model}
          token={this.props.token}
        /> */}
        <hr />
        <Results
          user={this.props.user}
          token={this.props.token}
          results={this.state.results}
        />
      </div>
    );
  }
}

export default App;

// import React, { Component } from "react";
// import {
//   Button,
//   Form,
//   Input,
//   Label,
//   FormGroup,
//   Modal,
//   ModalBody,
//   ModalHeader,
// } from "reactstrap";

// import Search from "./Search";

// type PropsType = {
//   make: string;
//   model: string;
//   token: string;
// };

// type StateType = {
//   make: string;
//   model: string;
//   year: string;
//   title: string;
//   issue: string;
//   isOpen: boolean;
//   thisYear: string;
// };

// class PostIssue extends Component<PropsType, StateType> {
//   constructor(props: PropsType) {
//     super(props);
//     let today = new Date();
//     let year = today.getFullYear();
//     this.state = {
//       make: this.props.make,
//       model: this.props.model,
//       year: "",
//       title: "",
//       issue: "",
//       isOpen: false,
//       thisYear: year.toString(),
//     };
//     this.setTheMake = this.setTheMake.bind(this);
//     this.setTheModel = this.setTheModel.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   setTheMake(make: string) {
//     this.setState({ make: make });
//     // console.log('make:',this.state.make)
//   }

//   setTheModel(model: string) {
//     this.setState({ model: model });
//     // console.log('model:',this.state.model)
//   }

//   handleSubmit(e: any) {
//     e.preventDefault();
//     let url = `https://carissues-server.herokuapp.com/api/auth/${this.state.make}/${this.state.model}`;
//     console.log(url);
//     fetch(url, {
//       method: "POST",
//       body: JSON.stringify({
//         title: this.state.title,
//         issue: this.state.issue,
//         year: this.state.year ? this.state.year : null,
//       }),
//       headers: new Headers({
//         "Content-Type": "application/json",
//         Authorization: this.props.token,
//       }),
//     })
//       .then((res) => res.json())
//       .then((json) => {
//         console.log(json);
//         this.setState({ isOpen: false, year: "", title: "", issue: "" });
//       });
//   }

//   render() {
//     return (
//       <>
//         <Button onClick={() => this.setState({ isOpen: true })}>
//           Post an Issue
//         </Button>
//         <Modal isOpen={this.state.isOpen}>
//           <ModalHeader>Post issue</ModalHeader>
//           <ModalBody>
//             <Form onSubmit={this.handleSubmit}>
//               <FormGroup>
//                 <Search
//                   startMake={this.props.make}
//                   startModel={this.props.model}
//                   allowAll={false}
//                   setMake={this.setTheMake}
//                   setModel={this.setTheModel}
//                 />
//                 {/* </FormGroup>
//                             <FormGroup> */}
//                 <Label htmlFor="postYear">Year</Label>
//                 <Input
//                   placeholder="year"
//                   id="postYear"
//                   value={this.state.year}
//                   onChange={(e) => this.setState({ year: e.target.value })}
//                   type="number"
//                   min="1886"
//                   max={this.state.thisYear.toString()}
//                 />
//               </FormGroup>
//               <hr />
//               <FormGroup>
//                 <Label htmlFor="postTitle">Title</Label>
//                 <Input
//                   required
//                   placeholder="a brief overview of the issue"
//                   id="postTitle"
//                   value={this.state.title}
//                   onChange={(e) => this.setState({ title: e.target.value })}
//                 />
//                 <Label htmlFor="postIssue">Issue</Label>
//                 <Input
//                   required
//                   type="textarea"
//                   placeholder="describe your issue with greater detail"
//                   id="postIssue"
//                   value={this.state.issue}
//                   onChange={(e) => this.setState({ issue: e.target.value })}
//                 />
//               </FormGroup>
//               <Button color="success" type="submit">
//                 Post!
//               </Button>
//               <Button
//                 onClick={() => this.setState({ isOpen: false })}
//                 color="warning"
//                 type="button"
//               >
//                 Cancel
//               </Button>
//             </Form>
//           </ModalBody>
//         </Modal>
//       </>
//     );
//   }
// }

// export default PostIssue;
