import React from 'react';
import Header from './Header';
import Rate from './Rate';
import Dates from './Dates';
import Histogram from './Histogram';
import Updated from './Updated';
import Loading from './Loading';
import Error from './Error';
import styles from '../styles/World.module.scss';

class World extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            day: 0
        };

        this.handleDayChange = this.handleDayChange.bind(this);
    }

    processTimelineData(arr) {
        let processedArr = [];

        for (let i = 0; i < 10; i++) {
            let processedObj = {};

            for (let prop in arr[i]) {
                if (typeof(arr[i][prop]) === "number") {
                    processedObj[prop] = {
                        origin: arr[i][prop],
                        processed: arr[i][prop] === 0 ? "-" : arr[i][prop].toLocaleString("ru")
                    }
                } else if (typeof(arr[i][prop]) === "string") {
                    if (prop === "updated_at") {
                        processedObj.updated_at = new Date(Date.parse(arr[i].updated_at));
                    }
                }
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

        if (Object.keys(this.props.timeline).length) {
            if ("message" in this.props.timeline) {
                containerInner = <Error message={this.props.timeline.message}></Error>
            } else {
                let processedData = this.processTimelineData(this.props.timeline.data);

                containerInner = (
                    <>
                        <Header header="World"></Header>
                        <div className={styles.categories}>
                            <div className={styles.category}>
                                <span className={styles["category-name"]}>Confirmed:</span>
                                <span className="confirmed">
                                    {processedData[this.state.day].confirmed.processed}
                                </span>
                            </div>
                            <div className={styles.category}>
                                <span className={styles["category-name"]}>Deaths:</span>
                                <span className="deaths">
                                    {processedData[this.state.day].deaths.processed}
                                </span>
                            </div>
                            <div className={styles.category}>
                                <span className={styles["category-name"]}>Recovered:</span>
                                <span className="recovered">
                                    {processedData[this.state.day].recovered.processed}
                                </span>
                            </div>
                            <div className={styles.category}>
                                <span className={styles["category-name"]}>Active:</span>
                                <span className="active">
                                    {processedData[this.state.day].active.processed}
                                </span>
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

export default World;