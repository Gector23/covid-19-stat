import React from 'react';
import Location from './Location';
import World from './World';
import AllData from './AllData';
import styles from '../styles/App.module.scss';

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
        })
        .catch(e => this.setState(() => ({localData: e})));

        fetch("https://coronavirus-19-api.herokuapp.com/all")
        .then(response => response.json())
        .then(data => this.setState(() => ({worldData: data})));

        fetch("https://coronavirus-19-api.herokuapp.com/countries")
        .then(response => response.json())
        .then(data => {
            data.sort((a, b) => b.cases - a.cases).forEach(elemnt => {
                for (let prop in elemnt) {
                    if (elemnt[prop] === 0) elemnt[prop] = "-";
                }
            });

            this.setState(() => ({allCountriesData: data}));
        });
    }

    render() {
        return(
            <div className={styles.container}>
                <Location localData={this.state.localData}></Location>
                <World worldData={this.state.worldData}></World>
                <AllData allCountriesData={this.state.allCountriesData}></AllData>
            </div> 
        );
    }
}

export default App;