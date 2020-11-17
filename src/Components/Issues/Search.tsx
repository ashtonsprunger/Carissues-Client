import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

const CARS = require('../../Assets/cars.json')

type PropsType = {
    setMake: (make:any) => any;
    setModel: (model:any) => any;
    allowAll: boolean;
    startMake: string;
    startModel: string;
}

type StateType = {
    make: string,
    model: string,
    cars: any
}

class Search extends Component<PropsType,StateType>{
    constructor(props:PropsType){
        super(props)
        if(this.props.allowAll){
            this.state = {
                make: '--all--',
                model: '--all--',
                cars: CARS
            }
        }else{
            if(this.props.startMake === '--all--'){
                this.state = {
                    make: 'Acura',
                    model: 'CL',
                    cars: CARS
                }
            }else{
                this.state = {
                    make: this.props.startMake,
                    model: this.props.startModel,
                    cars: CARS
                }
            }
            if(this.props.startModel === '--all--'){
                this.state = {
                    make: this.state.make,
                    model: CARS[this.state.make][0],
                    cars: CARS
                }
            }
        }
        this.makeChange = this.makeChange.bind(this)
    }

    componentWillMount(){
        this.props.setMake(this.state.make);
        this.props.setModel(this.state.model);
    }

    makeChange(e:any){
        if(this.props.allowAll){
            this.setState({
                make: e.target.value,
                model: '--all--'
            })
            this.props.setMake(e.target.value)
            this.props.setModel('--all--')
        }else{
            this.setState({
                make: e.target.value,
                model: CARS[e.target.value][0]
            })
            this.props.setMake(e.target.value)
            this.props.setModel(CARS[e.target.value][0])
        }
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
                <div>
                    <Label htmlFor='makeSelect'>Make</Label>
                    <Input id="makeSelect" type='select' onChange={this.makeChange} value={this.state.make}>
                        {this.props.allowAll ? (<option value='--all--'>--All--</option>) : null}
                        {Object.keys(CARS).map(make => {
                            return <option value={make}>{make}</option>
                        })}
                    </Input>
                </div>
                <div>
                    <Label htmlFor='modelSelect'>Model</Label>
                    <Input id="modelSelect" type='select' onChange={e => {
                        this.setState({model:e.target.value})
                        this.props.setMake(this.state.make)
                        this.props.setModel(e.target.value)
                        }} value={this.state.model}>
                            {this.props.allowAll ? (<option value='--all--'>--All--</option>) : null}
                        {(this.state.make !== '--all--') ? (
                            CARS[this.state.make].sort().map((model:any) => {
                                return <option value={model}>{model}</option>
                            })
                        ) : null}
                    </Input>
                </div>
            </>
        )
    }
}

export default Search;