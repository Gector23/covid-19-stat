import React from 'react';
import Header from './Header';

class World extends React.Component {
    render() {
        return(
            <div>
                <Header header="World"></Header>
                <div>
                    <div>
                        <span>Confirmed:</span>
                        <span>{this.props.worldData.cases}</span>
                    </div>
                    <div>
                        <span>Deaths:</span>
                        <span>{this.props.worldData.deaths}</span>
                    </div>
                    <div>
                        <span>Recovered:</span>
                        <span>{this.props.worldData.recovered}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default World;