import React from 'react';
import Location from './Location';
import World from './World';
import Table from './Table';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            localData: {},
            worldData: {},
            allCountriesData: []
        }
    }

    componentDidMount() {
        new Promise((resolve) => {navigator.geolocation.getCurrentPosition(resolve)})
        .then(position => fetch(`https://geocode.xyz/${position.coords.latitude},${position.coords.longitude}?json=1`))
        .then(response => response.json())
        .then(location => fetch(`https://coronavirus-19-api.herokuapp.com/countries/${location.country}`))
        .then(response => response.json())
        .then(data => {
            for (let prop in data) {
                if (data[prop] === 0) data[prop] = "-";
            }

            this.setState(() => ({localData: data}));
        });

        fetch("https://coronavirus-19-api.herokuapp.com/all")
        .then(response => response.json())
        .then(data => this.setState(() => ({worldData: data})));
    }

    render() {
        return(
            <>
                <Location localData={this.state.localData}></Location>
                <World worldData={this.state.worldData}></World>
                <Table allCountriesData={this.state.allCountriesData}></Table>
            </>
        );
    }
}

export default App;