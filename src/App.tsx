import React, { Component } from 'react';
import './App.css';

import Issues from './Components/Issues/Issues'

type StateType = {
  token: string | null,
}

type PropsType = {

}

class App extends Component<PropsType, StateType>{
  constructor(props:PropsType){
    super(props)
    this.state = {
      token: null
    }
  }

  render(){
    return(
      <Issues/>
    )
  }
}

export default App;
