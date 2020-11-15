import React, { Component } from 'react';
import { Button, Card, CardBody, CardSubtitle, CardTitle, Collapse } from 'reactstrap'

type PropsType = {
    results: any
}

type StateType = {
    results: any,
    fixesAreOpen: boolean,
    fixText: string
}

class Welcome extends Component<PropsType, StateType>{
    constructor(props: PropsType){
        super(props)
        this.state = {
            results: props.results,
            fixesAreOpen: false,
            fixText: 'expand fixes'
        }
        this.toggleFix = this.toggleFix.bind(this)
    }

    toggleFix(){
        this.setState({
            fixesAreOpen: !this.state.fixesAreOpen,
            fixText: this.state.fixText === 'expand fixes' ? 'close fixes' : 'expand fixes'
        })
    }

    render(){
        console.log('Results:',this.props.results)
        return(
            <div>
                {
                    this.props.results.length > 0 ? (
                        this.props.results.map((issue:any, index:number) => {
                            return(
                                <Card className='issueCard'>
                                    <CardTitle>{issue.title}</CardTitle>
                                    <CardSubtitle>{`${issue.make}, ${issue.model}`}</CardSubtitle>
                                    <CardBody>
                                        <p>{issue.issue}</p>
                                    </CardBody>
                                    {
                                        issue.fixes.length > 0 ? (
                                            <>
                                                <Button onClick={this.toggleFix}>{this.state.fixText}</Button>
                                                <Collapse isOpen={this.state.fixesAreOpen}>
                                                    {
                                                        issue.fixes.map((fix:any) => {
                                                            return(
                                                                <Card className='fixCard'>
                                                                    <CardBody>{fix.fix}</CardBody>
                                                                </Card>
                                                            )
                                                        })
                                                    }
                                                </Collapse>
                                            </>
                                        ) : <p>No fixes yet :(</p>
                                    }
                                </Card>
                            )
                        })
                    ) : <h1>Sorry! no results :(</h1>
                }
            </div>
        )
    }
}

export default Welcome;