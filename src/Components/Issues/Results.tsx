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
import DeleteIssue from "./DeleteIssue";
import PostFix from "./PostFix";
import EditFix from "./EditFix";
import DeleteFix from "./DeleteFix";

import AdminUpdateIssue from "./AdminUpdateIssue";
import AdminDeleteIssue from "./AdminDeleteIssue";

type PropsType = {
  results: any;
  token: string;
  user: any;
  fetchResults: () => void;
  showUser: boolean;
  showYourIssues: boolean;
};

type StateType = {
  results: Array<object>;
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
            if (
              this.props.user &&
              issue.userId == this.props.user.id &&
              !this.props.showYourIssues
            ) {
              return null;
            }
            return (
              <Card color="light" className="issueCard">
                <div className="issueSubtitle">
                  <span>{`${issue.year ? issue.year : ""} ${issue.make} ${
                    issue.model
                  }`}</span>
                  <span>
                    {this.props.showUser ? issue.user.name : null}{" "}
                    {this.props.user ? (
                      issue.userId == this.props.user.id ? (
                        <>
                          {this.props.showUser ? "(you)" : null}{" "}
                          <UpdateIssue
                            token={this.props.token}
                            make={issue.make}
                            model={issue.model}
                            year={issue.year}
                            title={issue.title}
                            issue={issue.issue}
                            id={issue.id}
                          />{" "}
                          <DeleteIssue
                            id={issue.id}
                            user={this.props.user}
                            title={issue.title}
                            token={this.props.token}
                          />
                        </>
                      ) : this.props.user.admin ? (
                        <>
                          <AdminUpdateIssue
                            make={issue.make}
                            model={issue.model}
                            year={issue.year}
                            title={issue.title}
                            issue={issue.issue}
                            id={issue.id}
                            token={this.props.token}
                          />{" "}
                          <AdminDeleteIssue
                            token={this.props.token}
                            id={issue.id}
                            user={this.props.user}
                            title={issue.title}
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
                    <span className="fixesSpan">
                      <a
                        className="linkButton expandFixes"
                        id={`index:${index}`}
                        onClick={this.toggleFix}
                      >
                        fixes ↓↑
                      </a>
                    </span>
                    <Collapse
                      isOpen={this.state.fixesAreOpen[`index:${index}`]}
                    >
                      {this.props.token ? (
                        <PostFix
                          placeholder="have another fix? post it here!"
                          token={this.props.token}
                          id={issue.id}
                        />
                      ) : null}
                      {issue.fixes.map((fix: any) => {
                        return (
                          <Card color="dark" className="fixCard">
                            {fix.user.name}
                            {this.props.user ? (
                              fix.userId == this.props.user.id ? (
                                <>
                                  <EditFix
                                    fetchResults={this.props.fetchResults}
                                    token={this.props.token}
                                    fix={fix.fix}
                                    id={fix.id}
                                  />
                                  <DeleteFix
                                    id={fix.id}
                                    fix={fix.fix}
                                    token={this.props.token}
                                    user={this.props.user}
                                  />
                                </>
                              ) : (
                                " not yours"
                              )
                            ) : null}
                            <CardBody>{fix.fix}</CardBody>
                          </Card>
                        );
                      })}
                    </Collapse>
                  </>
                ) : (
                  <>
                    <p className="noFixes">No fixes yet :(</p>
                    {this.props.token ? (
                      <PostFix
                        placeholder="have a fix? post it here!"
                        token={this.props.token}
                        id={issue.id}
                      />
                    ) : null}
                  </>
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
