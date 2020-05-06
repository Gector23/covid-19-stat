import React from 'react';
import Header from './Header';
import Rate from './Rate';
import Dates from './Dates';
import Histogram from './Histogram';
import Updated from './Updated';
import Loading from './Loading';
import Error from './Error';
import styles from '../styles/Location.module.scss';

class Location extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            day: 0
        };

        this.handleDayChange = this.handleDayChange.bind(this);
    }

    processLocalData(obj) {
        let processedArr = [];

        for (let i = 0; i < 10; i++) {
            let processedObj = {};

            for (let prop in obj.timeline[i]) {
                if (typeof(obj.timeline[i][prop]) === "number") {
                    if (prop.split("_")[0] === "new") {
                        processedObj[prop] = {
                            origin: obj.timeline[i][prop],
                            processed: obj.timeline[i][prop] === 0 ? "-" : "+" + obj.timeline[i][prop].toLocaleString("ru")
                        }
                    } else {
                        processedObj[prop] = {
                            origin: obj.timeline[i][prop],
                            processed: obj.timeline[i][prop] === 0 ? "-" : obj.timeline[i][prop].toLocaleString("ru")
                        }
                    }
                } else if (typeof(obj.timeline[i][prop]) === "string") {
                    if (prop === "updated_at") {
                        processedObj.updated_at = new Date(Date.parse(obj.timeline[i].updated_at));
                    }
                }
            }

            if (i === 0) {
                processedObj.critical = obj.latest_data.critical === 0 ? "-" : obj.latest_data.critical.toLocaleString("ru");

                processedObj.cases_per_million_population = obj.latest_data.calculated.cases_per_million_population === 0 ? "-" : obj.latest_data.calculated.cases_per_million_population.toLocaleString("ru");
            } else {
                processedObj.critical = "-";
                processedObj.cases_per_million_population = "-";
            }

            processedArr.push(processedObj);
        }

        return processedArr;
    }

    handleDayChange(day) {
        this.setState(() => {
            return {day};
        })
    }

    render() {
        let containerInner;

        if (Object.keys(this.props.local).length) {
            if ("message" in this.props.local) {
                containerInner = <Error message={this.props.local.message}></Error>
            } else {
                let processedData = this.processLocalData(this.props.local.data);

                containerInner = (
                    <>
                        <Header header={this.props.local.data.name}></Header>
                        <div className={styles.categories}>
                            <div className={styles.category}>
                                <div className={styles["category-name"]}>Confirmed:</div>
                                <div className={`${styles.data} confirmed`}>
                                    <span>{processedData[this.state.day].confirmed.processed}</span>
                                    <span>{processedData[this.state.day].new_confirmed.processed}</span>
                                </div>
                            </div>
                            <div className={styles.category}>
                                <div className={styles["category-name"]}>Deaths:</div>
                                <div className={`${styles.data} deaths`}>
                                    <span>{processedData[this.state.day].deaths.processed}</span>
                                    <span>{processedData[this.state.day].new_deaths.processed}</span>
                                </div>
                            </div>
                            <div className={styles.category}>
                                <div className={styles["category-name"]}>Recovered:</div>
                                <div className={`${styles.data} recovered`}>
                                    <span>{processedData[this.state.day].recovered.processed}</span>
                                    <span>{processedData[this.state.day].new_recovered.processed}</span>
                                </div>
                            </div>
                            <div className={styles.category}>
                                <div className={styles["category-name"]}>Active:</div>
                                <div className={`${styles.data} active`}>
                                    <span>{processedData[this.state.day].active.processed}</span>
                                </div>
                            </div>
                            <div className={styles.category}>
                                <div className={styles["category-name"]}>Critical:</div>
                                <div className={`${styles.data} critical`}>
                                    <span>{processedData[this.state.day].critical}</span>
                                </div>
                            </div>
                            <div className={styles.category}>
                                <div className={styles["category-name"]} title="cases per million population">CPM:</div>
                                <div className={`${styles.data} cpm`}>
                                    <span>{processedData[this.state.day].cases_per_million_population}</span>
                                </div>
                            </div>
                        </div>
                        <Rate days={processedData} day={this.state.day}></Rate>
                        <Dates days={processedData} day={this.state.day} onDayChange={this.handleDayChange}></Dates>
                        <Histogram days={processedData}></Histogram>
                        <Updated update={processedData[this.state.day].updated_at}></Updated>
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