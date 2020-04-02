import React from 'react';

class Table extends React.Component {
    render() {
        let tBody = this.props.allCountriesData.map(element => {
            return (
                <tr>
                    <td>{element.country}</td>
                    <td>{element.cases}</td>
                    <td>{element.todayCases}</td>
                    <td>{element.deaths}</td>
                    <td>{element.todayDeaths}</td>
                    <td>{element.recovered}</td>
                    <td>{element.active}</td>
                    <td>{element.critical}</td>
                </tr>
            )
        });

        return (
            <table>
                <thead>
                    <tr>
                        <th>Country</th>
                        <th>Confirmed</th>
                        <th>Today confirmed</th>
                        <th>Deaths</th>
                        <th>Today deaths</th>
                        <th>Recovered</th>
                        <th>Existing</th>
                        <th>Critical</th>
                    </tr>
                </thead>
                <tbody>
                    {tBody}
                </tbody>
            </table>
        );
    }
}

export default Table;