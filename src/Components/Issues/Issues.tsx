import React, { Component } from 'react';
import { Button, Form, FormGroup } from 'reactstrap';

import Results from './Results'
import Search from './Search'

type StateType = {
  results: any,
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
      results: [],
      make: '--all--',
      model: '--all--',
      token: null
    }
    this.setTheMake = this.setTheMake.bind(this)
    this.setTheModel = this.setTheModel.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.setResults = this.setResults.bind(this)
  }

  componentWillMount(){
      this.fetchResults()
  }

  setResults(results:any){
      this.setState({results: results})
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

  fetchResults(){
    let url = 'https://carissues-server.herokuapp.com/api/unauth'
    if(this.state.make !== '--all--'){
      url += `/${this.state.make}`
      if(this.state.model !== '--all--'){
        url += `/${this.state.model}`
      }
    }
    console.log(url)
    fetch(url).then(res => res.json()).then(this.setResults)
  }

  handleSubmit(e: any){
    e.preventDefault();
    this.fetchResults()
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
        <Results results={this.state.results} />
      </>
    )
  }
}

export default App;