import React, { Component } from 'react';
import { Button } from 'reactstrap'

type PropsType = {
    results: any
}

class Welcome extends Component<PropsType, {}>{
    constructor(props: PropsType){
        super(props)
    }

    render(){
        return(
            <div>
                {this.props.results.map((issue:any, index:number) => {
                    return(
                        <>
                            <p>{issue.title}</p>
                            <p>{issue.issue}</p>
                            <Button color={index ? 'success' : 'danger'}>Hello</Button>
                        </>
                    )
                })}
            </div>
        )
    }
}

export default Welcome;