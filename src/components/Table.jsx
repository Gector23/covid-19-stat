import React from 'react';
import Header from './Header';

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
                    <td>{element.totalTests}</td>
                    <td>{element.casesPerOneMillion}</td>
                    <td>{element.deathsPerOneMillion}</td>
                    <td>{element.testsPerOneMillion}</td>
                </tr>
            )
        });

        return (
            <div>
                <Header header="All data"></Header>
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
                            <th>Tests</th>
                            <th title="Сonfirmations per million">CPM</th>
                            <th title="Deaths per million">DPM</th>
                            <th title="Tests per million">TPM</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tBody}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Table;