import React from 'react';

class World extends React.Component {
    render() {
        return(
            <div>
                <div>World</div>
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