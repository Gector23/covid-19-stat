import React from 'react';

class Location extends React.Component {
    render() {
        return(
            <div>
                <div>{this.props.localData.country}</div>
                <div>
                    <div>
                        <div>Confirmed:</div>
                        <div>
                            <span>{this.props.localData.cases}</span>
                            <span>{this.props.localData.todayCases}</span>
                        </div>
                    </div>
                    <div>
                        <div>Deaths:</div>
                        <div>
                            <span>{this.props.localData.deaths}</span>
                            <span>{this.props.localData.todayDeaths}</span>
                        </div>
                    </div>
                    <div>
                        <div>Recovered:</div>
                        <div>
                            <span>{this.props.localData.recovered}</span>
                        </div>
                    </div>
                    <div>
                        <div>Existing:</div>
                        <div>
                            <span>{this.props.localData.existing}</span>
                        </div>
                    </div>
                    <div>
                        <div>Critical:</div>
                        <div>
                            <span>{this.props.localData.critical}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Location;