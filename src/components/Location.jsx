import React from 'react';
import Header from './Header';
import Rate from './Rate';
import Updated from './Updated';
import Loading from './Loading';
import Error from './Error';
import styles from '../styles/Location.module.scss';

class Location extends React.Component {
    constructor(props) {
        super(props);

        this.processLocalData = this.processLocalData.bind(this);
    }

    processLocalData(obj) {
        let processedObj = {};

        for (let prop in obj) {
            if (typeof(obj[prop]) === "object" && obj[prop]) {
                if (prop === "today") {
                    processedObj.today = {
                        confirmed: "+" + obj.today.confirmed.toLocaleString("ru"),
                        deaths: "+" + obj.today.deaths.toLocaleString("ru")
                    };
                } else {
                    processedObj[prop] = this.processLocalData(obj[prop]);
                }
            } else if (typeof(obj[prop]) === "number") {
                processedObj[prop] =  obj[prop] === 0 ? "-" : obj[prop].toLocaleString("ru");
            } else if (typeof(obj[prop]) === "string") {
                if (prop === "updated_at") {
                    processedObj.updated_at = new Date(Date.parse(obj.updated_at));
                }
            }
        }

        return processedObj;
    }

    render() {
        let containerInner;

        if (Object.keys(this.props.local).length) {
            if ("message" in this.props.local) {
                containerInner = <Error message={this.props.local.message}></Error>
            } else {
                let processedData = this.processLocalData(this.props.local);

                containerInner = (
                    <>
                        <Header header={this.props.local.name}></Header>
                        <div className={styles.categories}>
                            <div className={styles.category}>
                                <div className={styles["category-name"]}>Confirmed:</div>
                                <div className={`${styles.data} confirmed`}>
                                    <span>{processedData.latest_data.confirmed}</span>
                                    <span>{processedData.today.confirmed}</span>
                                </div>
                            </div>
                            <div className={styles.category}>
                                <div className={styles["category-name"]}>Deaths:</div>
                                <div className={`${styles.data} deaths`}>
                                    <span>{processedData.latest_data.deaths}</span>
                                    <span>{processedData.today.deaths}</span>
                                </div>
                            </div>
                            <div className={styles.category}>
                                <div className={styles["category-name"]}>Recovered:</div>
                                <div className={`${styles.data} recovered`}>
                                    <span>{processedData.latest_data.recovered}</span>
                                </div>
                            </div>
                            <div className={styles.category}>
                                <div className={styles["category-name"]}>Active:</div>
                                <div className={`${styles.data} active`}>
                                    <span>{processedData.latest_data.active}</span>
                                </div>
                            </div>
                            <div className={styles.category}>
                                <div className={styles["category-name"]}>Critical:</div>
                                <div className={`${styles.data} critical`}>
                                    <span>{processedData.latest_data.critical}</span>
                                </div>
                            </div>
                            <div className={styles.category}>
                                <div className={styles["category-name"]}>Cases per million:</div>
                                <div className={`${styles.data} cpm`}>
                                    <span>{processedData.latest_data.calculated.cases_per_million_population}</span>
                                </div>
                            </div>
                        </div>
                        <Rate recoveryRate={this.props.local.latest_data.calculated.recovery_rate} deathsRate={this.props.local.latest_data.calculated.death_rate}></Rate>
                        <Updated update={processedData.updated_at}></Updated>
                    </>
                );
            }
        } else {
            containerInner = <Loading></Loading>;
        }

        return(
            <div className={styles.container}>
                {containerInner}
            </div>
        );
    }
}

export default Location;