import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Collapse,
} from "reactstrap";

import UpdateIssue from "./UpdateIssue";

type PropsType = {
  results: any;
  token: string;
  user: any;
};

type StateType = {
  results: any;
  fixesAreOpen: any;
  fixesText: any;
};

class Welcome extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      results: props.results,
      fixesAreOpen: {},
      fixesText: {},
    };
    this.toggleFix = this.toggleFix.bind(this);
  }

  toggleFix(e: any) {
    let buttonId = e.target.id;
    this.state.fixesAreOpen[buttonId] = !this.state.fixesAreOpen[buttonId];

    // this.state.fixesAreOpen[buttonId] ? this.setState({fixesText: 'close fixes ↑'}) : 'expand fixes ↓';
    // let fixesTextClone = this.state.fixesText;
    // fixesTextClone[buttonId] = newFixText
    // console.log(fixesTextClone)

    // this.state.fixesText[buttonId] = 'close fixes ↑'
    // console.log(this.state.fixesText)
    this.setState({
      fixesAreOpen: this.state.fixesAreOpen,
      // fixesText:
    });

    // this.setState({
    //     fixesText: fixesTextClone
    // })
    // console.log(this.state.fixesText)
  }

  render() {
    console.log("Results:", this.props.results);
    return (
      <div>
        {this.props.results.length > 0 ? (
          this.props.results.map((issue: any, index: number) => {
            return (
              <Card color="light" className="issueCard">
                <div className="issueSubtitle">
                  <span>{`${issue.year ? issue.year : ""} ${issue.make} ${
                    issue.model
                  }`}</span>
                  <span>
                    {issue.user.name}{" "}
                    {this.props.user ? (
                      issue.userId == this.props.user.id ? (
                        <>
                          (you){" "}
                          <UpdateIssue
                            token={this.props.token}
                            make={issue.make}
                            model={issue.model}
                            year={issue.year}
                            title={issue.title}
                            issue={issue.issue}
                            id={issue.id}
                          />
                        </>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                  </span>
                </div>

                <CardTitle className="issueTitle">{issue.title}</CardTitle>
                <body className="issueBody">
                  <p>{issue.issue}</p>
                </body>
                <p hidden>
                  {(this.state.fixesText[`index:${index}`] = "expand fixes ↓")}
                </p>
                {issue.fixes.length > 0 ? (
                  <>
                    <a
                      className="expandFixes"
                      id={`index:${index}`}
                      onClick={this.toggleFix}
                    >
                      fixes ↓↑
                    </a>
                    <Collapse
                      isOpen={this.state.fixesAreOpen[`index:${index}`]}
                    >
                      {issue.fixes.map((fix: any) => {
                        return (
                          <Card color="dark" className="fixCard">
                            <CardBody>{fix.fix}</CardBody>
                          </Card>
                        );
                      })}
                    </Collapse>
                  </>
                ) : (
                  <p className="noFixes">No fixes yet :(</p>
                )}
              </Card>
            );
          })
        ) : (
          <h1>Sorry! no results :(</h1>
        )}
      </div>
    );
  }
}

export default Welcome;
