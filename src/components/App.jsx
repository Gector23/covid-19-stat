import React from 'react';
import Location from './Location';
import World from './World';

class App extends React.Component {
    render() {
        return(
            <>
                <Location localData={{}}></Location>
                <World worldData={{}}></World>
            </>
        );
    }
}

export default App;