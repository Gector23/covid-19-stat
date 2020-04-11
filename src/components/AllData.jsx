import React from 'react';
import Header from './Header';
import styles from '../styles/AllData.module.scss';

class AllData extends React.Component {
    render() {
        let tBody = this.props.allCountriesData.map(element => {
            return (
                <tr className={styles["table-row"]}>
                    <td>{element.country}</td>
                    <td className={styles["data-confirmed"]}>{element.cases}</td>
                    <td className={styles["data-today-confirmed"]}>{element.todayCases}</td>
                    <td className={styles["data-deaths"]}>{element.deaths}</td>
                    <td className={styles["data-today-deaths"]}>{element.todayDeaths}</td>
                    <td className={styles["data-recovered"]}>{element.recovered}</td>
                    <td className={styles["data-existing"]}>{element.active}</td>
                    <td className={styles["data-critical"]}>{element.critical}</td>
                    <td>{element.totalTests}</td>
                    <td>{element.casesPerOneMillion}</td>
                    <td>{element.deathsPerOneMillion}</td>
                    <td>{element.testsPerOneMillion}</td>
                </tr>
            )
        });

        return (
            <div className={styles.container}>
                <Header header="All data"></Header>
                <div className={styles.data}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th className={styles["category-name"]}>Country</th>
                                <th className={styles["category-name"]}>Confirmed</th>
                                <th className={styles["category-name"]}>Today confirmed</th>
                                <th className={styles["category-name"]}>Deaths</th>
                                <th className={styles["category-name"]}>Today deaths</th>
                                <th className={styles["category-name"]}>Recovered</th>
                                <th className={styles["category-name"]}>Existing</th>
                                <th className={styles["category-name"]}>Critical</th>
                                <th className={styles["category-name"]}>Tests</th>
                                <th className={styles["category-name"]} title="Сonfirmations per million">CPM</th>
                                <th className={styles["category-name"]} title="Deaths per million">DPM</th>
                                <th className={styles["category-name"]} title="Tests per million">TPM</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tBody}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default AllData;