import React from 'react';
import Header from './Header';
import Rate from './Rate';
import Loading from './Loading';
import Error from './Error';
import styles from '../styles/World.module.scss';

class World extends React.Component {
    constructor(props) {
        super(props);

        this.processTimelineData = this.processTimelineData.bind(this);
    }

    processTimelineData(obj) {
        let processedObj = {};

        for (let prop in obj) {
            if (typeof(obj[prop]) === "object" && obj[prop]) {
                processedObj[prop] = this.processTimelineData(obj[prop]);
            } else if (typeof(obj[prop]) === "number") {
                processedObj[prop] =  obj[prop] === 0 ? "-" : obj[prop].toLocaleString("ru");
            }
        }

        return processedObj;
    }

    render() {
        let containerInner;

        if (Object.keys(this.props.timeline).length) {
            if ("message" in this.props.timeline) {
                containerInner = <Error message={this.props.timeline.message}></Error>
            } else {
                let processedData = this.processTimelineData(this.props.timeline.data[0]);

                const recoveryRate = this.props.timeline.data[0].recovered / (this.props.timeline.data[0].confirmed / 100);
                const deathsRate = this.props.timeline.data[0].deaths / (this.props.timeline.data[0].confirmed / 100);

                containerInner = (
                    <>
                        <Header header="World"></Header>
                        <div className={styles.categories}>
                            <div className={styles.category}>
                                <span className={styles["category-name"]}>Confirmed:</span>
                                <span className="confirmed">
                                    {processedData.confirmed}
                                </span>
                            </div>
                            <div className={styles.category}>
                                <span className={styles["category-name"]}>Deaths:</span>
                                <span className="deaths">
                                    {processedData.deaths}
                                </span>
                            </div>
                            <div className={styles.category}>
                                <span className={styles["category-name"]}>Recovered:</span>
                                <span className="recovered">
                                    {processedData.recovered}
                                </span>
                            </div>
                            <div className={styles.category}>
                                <span className={styles["category-name"]}>Active:</span>
                                <span className="active">
                                    {processedData.active}
                                </span>
                            </div>
                        </div>
                        <Rate recoveryRate={recoveryRate} deathsRate={deathsRate}></Rate>
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