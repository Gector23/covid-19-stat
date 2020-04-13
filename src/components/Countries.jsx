import React from 'react';
import Header from './Header';
import Loading from './Loading';
import Error from './Error';
import styles from '../styles/Countries.module.scss';

class Countries extends React.Component {
    render() {
        let containerInner;

        if (Object.keys(this.props.countries).length) {
            if ("message" in this.props.countries) {
                containerInner = <Error message={this.props.countries.message}></Error>
            } else {
                let tBody = this.props.countries.data.map((element, index) => {
                    const active = element.latest_data.confirmed - element.latest_data.deaths - element.latest_data.recovered;
                    return (
                        <tr className={styles["table-row"]} key={index}>
                            <td>{element.name.split(",")[0]}</td>
                            <td className={styles["data-confirmed"]}>{element.latest_data.confirmed}</td>
                            <td className={styles["data-confirmed"]}>{element.today.confirmed}</td>
                            <td className={styles["data-deaths"]}>{element.latest_data.deaths}</td>
                            <td className={styles["data-deaths"]}>{element.today.deaths}</td>
                            <td className={styles["data-deaths"]}>{Math.round(element.latest_data.calculated.death_rate) + "%"}</td>
                            <td className={styles["data-recovered"]}>{element.latest_data.recovered}</td>
                            <td className={styles["data-recovered"]}>{Math.round(element.latest_data.calculated.recovery_rate) + "%"}</td>
                            <td className={styles["data-active"]}>{active}</td>
                            <td className={styles["data-critical"]}>{element.latest_data.critical}</td>
                        </tr>
                    )
                });
    
                containerInner = (
                    <>
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
                                        <th className={styles["category-name"]}>Deaths rate</th>
                                        <th className={styles["category-name"]}>Recovered</th>
                                        <th className={styles["category-name"]}>Recovery rate</th>
                                        <th className={styles["category-name"]}>Existing</th>
                                        <th className={styles["category-name"]}>Critical</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tBody}
                                </tbody>
                            </table>
                        </div>
                    </>
                );
            }
        } else {
            containerInner = <Loading></Loading>;
        }

        return (
            <div className={styles.container}>
                {containerInner}
            </div>
        );
    }
}

export default Countries;