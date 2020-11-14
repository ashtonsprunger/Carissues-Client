import React, { Component } from 'react';
import { Button, Form, FormGroup } from 'reactstrap';
import './App.css';

import Results from './Components/Issues/Results'
import Search from './Components/Issues/Search'

type StateType = {
  token: string | null,
  make: string,
  model: string
}

type PropsType = {

}

class App extends Component<PropsType, StateType>{
  constructor(props:PropsType){
    super(props)
    this.state = {
      make: '--all--',
      model: '--all--',
      token: null
    }
    this.setTheMake = this.setTheMake.bind(this)
    this.setTheModel = this.setTheModel.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  setTheMake(make:string){
    this.setState({make:make})
    // console.log('make:',this.state.make)
  }
  setTheModel(model:string){
    this.setState({model:model})
    // console.log('model:',this.state.model)
  }

  componentDidUpdate(){
    console.log(this.state.make + '/' + this.state.model)
  }

  handleSubmit(e: any){
    e.preventDefault();
    let url = 'https://carissues-server.herokuapp.com/api/unauth'
    if(this.state.make != '--all--'){
      url += `/${this.state.make}`
      if(this.state.model != '--all--'){
        url += `/${this.state.model}`
      }
    }
    console.log(url)
    fetch(url).then(res => res.json()).then(console.log)
  }

  render(){
    return(
      <>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Search setMake={this.setTheMake} setModel={this.setTheModel}/>
          </FormGroup>
          <Button type='submit' color='warning'>Search!</Button>
        </Form>
        <Results results={[{issue:"issue 1", title:'title 2'},{issue:'issue 2', title:'title 2'}]} />
      </>
    )
  }
}

export default App;
