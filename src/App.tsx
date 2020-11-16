import { stringify } from 'querystring';
import React, { Component } from 'react';
import './App.css';

import Issues from './Components/Issues/Issues';
import Auth from './Components/Auth/Auth';

type StateType = {
  token: any
}

type PropsType = {

}

class App extends Component<PropsType, StateType>{
  constructor(props:PropsType){
    super(props)
    this.state = {
      token: ''
    }
    this.setToken = this.setToken.bind(this)
  }

  componentWillMount(){
    console.log('TOKEN')
    this.getToken()
  }

  getToken(){
    if(typeof localStorage.getItem('token') === 'string'){
      this.setState({
        token: localStorage.getItem('token')
      })
    }
  }

  setToken(token: string){
    localStorage.setItem('token', token);
    this.setState({
      token: token
    })
  }

  render(){
    return(
      <div id='wrapper'>
        <Auth token={this.state.token} setToken={this.setToken}/>
        <Issues token={this.state.token}/>
      </div>
    )
  }
}

export default App;
