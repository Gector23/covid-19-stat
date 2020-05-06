import React from 'react';
import Location from './Location';
import World from './World';
import Countries from './Countries';
import styles from '../styles/App.module.scss';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            local: {},
            timeline: {},
            countries: {}
        }
    }

    componentDidMount() {
        new Promise(resolve => {navigator.geolocation.getCurrentPosition(resolve)})
        .then(position => fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=eu`))
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                throw new Error(`Status ${response.status}`)
            }
        })
        .then(response => response.json())
        .then(location => fetch(`https://corona-api.com/countries/${location.countryCode}`))
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                throw new Error(`Status ${response.status}`)
            }
        })
        .then(response => response.json())
        .then(localData => this.setState(() => ({local: localData})))
        .catch(e => this.setState(() => ({local: {message: e.message}})));

        fetch("https://corona-api.com/timeline")
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                throw new Error(`Status ${response.status}`)
            }
        })
        .then(response => response.json())
        .then(timelineData => this.setState(() => ({timeline: timelineData})))
        .catch(e => this.setState(() => ({timeline: {message: e.message}})));

        fetch("https://corona-api.com/countries")
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                throw new Error(`Status ${response.status}`)
            }
        })
        .then(response => response.json())
        .then(countriesData => {
            countriesData.data.map(country => country.latest_data.active = country.latest_data.confirmed - country.latest_data.deaths - country.latest_data.recovered);
            this.setState(() => ({countries: countriesData}));
        })
        .catch(e => this.setState(() => ({countries: {message: e.message}})));
    }

    render() {
        return(
            <div className={styles.container}>
                <header className="header">
                    <h1 className="main-header">Covid-19</h1>
                </header>
                <Location local={this.state.local}></Location>
                <World timeline={this.state.timeline}></World>
                <Countries countries={this.state.countries}></Countries>
                <footer className="footer">
                    <a className="link" target="_blank" rel="noopener noreferrer" href="https://github.com/Gector23/covid-19-in-your-country">GitHub</a>
                </footer>
            </div>
        );
    }
}

export default App;