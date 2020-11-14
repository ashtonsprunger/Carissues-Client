import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

const CARS = require('../../Assets/cars.json')

type PropsType = {
    setMake: (make:any) => any;
    setModel: (model:any) => any;
}

type StateType = {
    make: string,
    model: string,
    cars: any
}

class Search extends Component<PropsType,StateType>{
    constructor(props:PropsType){
        super(props)
        this.state = {
            make: '--all--',
            model: '--all--',
            cars: CARS
        }
        this.makeChange = this.makeChange.bind(this)
    }

    makeChange(e:any){
        this.setState({
            make: e.target.value,
            model: '--all--'
        })
        this.props.setMake(e.target.value)
        this.props.setModel('--all--')
    }

    // componentDidUpdate(){
    //     this.props.setMake(this.state.make)
    //     this.props.setModel(this.state.model)
    // }

    // componentWillMount(){
    //     this.props.setMake(this.state.make)
    //     this.props.setModel(this.state.model)
    // }

    // componentDidMount(){
    //     fetch('../../Assets/cars.json').then(res => res.json()).then((json) => {
    //         console.log("json:",json)
    //         this.setState({
    //             cars: json
    //         })
    //     })
    // }

    // handleSubmit(e: any){
    //     e.preventDefault()
    //     let url = `https://carissues-server.herokuapp.com/api/unauth/${this.state.make}/${this.state.model}`
    //     console.log(url)
    //     fetch(url).then(res => res.json()).then(json => {
    //         console.log(json)
    //     })
    // }

    render(){
        return(
            <>
                <Label htmlFor='makeSelect'>Make</Label>
                <Input id="makeSelect" type='select' onChange={this.makeChange} value={this.state.make}>
                    <option value='--all--'>--All--</option>
                    {Object.keys(CARS).map(make => {
                        return <option value={make}>{make}</option>
                    })}
                </Input>
                <Label htmlFor='modelSelect'>Model</Label>
                <Input id="modelSelect" type='select' onChange={e => {
                    this.setState({model:e.target.value})
                    this.props.setMake(this.state.make)
                    this.props.setModel(e.target.value)
                    }} value={this.state.model}>
                        <option value='--all--'>--All--</option>
                    {(this.state.make !== '--all--') ? (
                        CARS[this.state.make].map((model:any) => {
                            return <option value={model}>{model}</option>
                        })
                     ) : null}
                </Input>
            </>
        )
    }
}

export default Search;