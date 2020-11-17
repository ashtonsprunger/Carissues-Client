import React, { Component } from 'react';

import Login from './login';
import Register from './register';

type PropsType = {
    token: any,
    setToken: (token: string) => void
}

type StateType = {
    // registerOpen: boolean,
    // loginOpen: boolean
}

class Auth extends Component<PropsType,StateType>{
    constructor(props: PropsType){
        super(props)
        this.state = {
            registerOpen: false,
            loginOpen: false
        }
        this.setRegisterOpen = this.setRegisterOpen.bind(this);
        this.setLoginOpen = this.setLoginOpen.bind(this)
    }

    setRegisterOpen(isOpen: boolean){
        this.setState({
            registerOpen: isOpen
        })
    }

    setLoginOpen(isOpen: boolean){
        this.setState({
            loginOpen: isOpen
        })
    }
    
    render(){
        console.log(this)
        return(
            <div id='authWrapper'>
                <h1>Carissues</h1>
                {this.props.token ? (<h1>yes</h1>) : (<h1>no</h1>)}
                <Login setToken={this.props.setToken} token={this.props.token}/>
                <Register setToken={this.props.setToken} token={this.props.token}/>
            </div>
        )
    }
}

export default Auth;