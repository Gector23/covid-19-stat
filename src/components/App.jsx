import React from 'react';
import Location from './Location';
import World from './World';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            worldData: {
                cases: "-",
                deaths: "-",
                recovered: "-"
            }
        }
    }

    componentDidMount() {
        fetch("https://coronavirus-19-api.herokuapp.com/all")
        .then(response => response.json())
        .then(data => this.setState(() => ({worldData: data})));
    }

    render() {
        return(
            <>
                <Location localData={{}}></Location>
                <World worldData={this.state.worldData}></World>
            </>
        );
    }
}

export default App;