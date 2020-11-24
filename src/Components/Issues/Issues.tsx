import React, { Component } from "react";
import { Button, Form, FormGroup } from "reactstrap";

import Results from "./Results";
import Search from "./Search";
import PostIssues from "./PostIssues";
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
    this.fetchResults = this.fetchResults.bind(this);
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
        <PostIssues
          make={this.state.make}
          model={this.state.model}
          token={this.props.token}
        />
        <hr />
        <Results
          showUser={true}
          fetchResults={this.fetchResults}
          user={this.props.user}
          token={this.props.token}
          results={this.state.results}
        />
      </div>
    );
  }
}

export default App;
