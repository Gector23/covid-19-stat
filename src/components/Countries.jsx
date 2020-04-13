import React from 'react';
import Header from './Header';
import Loading from './Loading';
import Error from './Error';
import styles from '../styles/Countries.module.scss';

class Countries extends React.Component {
    constructor(props) {
        super(props);

        this.processCountriesData = this.processCountriesData.bind(this);
    }

    processCountriesData(obj) {
        let processedObj = {};

        for (let prop in obj) {
            if (typeof(obj[prop]) === "object" && obj[prop]) {
                processedObj[prop] = this.processCountriesData(obj[prop]);
            } else if (typeof(obj[prop]) === "number") {
                processedObj[prop] =  obj[prop] === 0 ? "-" : obj[prop].toLocaleString("ru");
            }
        }

        if ("name" in obj) {
            processedObj.latest_data.active = obj.latest_data.confirmed - obj.latest_data.deaths - obj.latest_data.recovered;
            processedObj.latest_data.active = processedObj.latest_data.active === 0 ? "-" : processedObj.latest_data.active.toLocaleString("ru");

            processedObj.latest_data.calculated.death_rate = (Math.round(obj.latest_data.calculated.death_rate * 100) / 100) + "%";
            processedObj.latest_data.calculated.recovery_rate = (Math.round(obj.latest_data.calculated.recovery_rate * 100) / 100) + "%";
        }

        return processedObj;
    }

    render() {
        let containerInner;

        if (Object.keys(this.props.countries).length) {
            if ("message" in this.props.countries) {
                containerInner = <Error message={this.props.countries.message}></Error>
            } else {
                let tBody = this.props.countries.data.map((element, index) => {
                    let processedData = this.processCountriesData(element);

                    return (
                        <tr className={styles["table-row"]} key={index}>
                            <td>{element.name.split(",")[0]}</td>
                            <td className={styles["data-confirmed"]}>{processedData.latest_data.confirmed}</td>
                            <td className={styles["data-confirmed"]}>{processedData.today.confirmed}</td>
                            <td className={styles["data-deaths"]}>{processedData.latest_data.deaths}</td>
                            <td className={styles["data-deaths"]}>{processedData.today.deaths}</td>
                            <td className={styles["data-deaths"]}>{processedData.latest_data.calculated.death_rate}</td>
                            <td className={styles["data-recovered"]}>{processedData.latest_data.recovered}</td>
                            <td className={styles["data-recovered"]}>{processedData.latest_data.calculated.recovery_rate}</td>
                            <td className={styles["data-active"]}>{processedData.latest_data.active}</td>
                            <td className={styles["data-critical"]}>{processedData.latest_data.critical}</td>
                        </tr>
                    )
                });
    
                containerInner = (
                    <>
                        <Header header="Countries"></Header>
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