import React, {Component} from 'react';
import './App.css';

import {subscribeToTimer} from "./api/api";

class App extends Component {

    constructor(props)
    {
        super(props);

        //NOTE: App starts, subscribe to Timer event
        subscribeToTimer((timestamp) => {
            this.setState({timestamp});
        })

        this.state = {
            timestamp: 'no timestamp yet'
        };
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h2>Our awesome drawing app</h2>
                </div>
                This is the value of the timestamp : {this.state.timestamp}
            </div>
        );
    }
}

export default App;
