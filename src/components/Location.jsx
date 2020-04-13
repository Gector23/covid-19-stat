import React from 'react';
import Header from './Header';
import Loading from './Loading';
import Error from './Error';
import styles from '../styles/Location.module.scss';

class Location extends React.Component {
    render() {
        let containerInner;

        if (Object.keys(this.props.local).length) {
            if ("message" in this.props.local) {
                containerInner = <Error message={this.props.local.message}></Error>
            } else {
                const active = this.props.local.latest_data.confirmed - this.props.local.latest_data.deaths - this.props.local.latest_data.recovered;

                containerInner = (
                    <>
                        <Header header={this.props.local.name}></Header>
                        <div className={styles.categories}>
                            <div className={styles.category}>
                                <div className={styles["category-name"]}>Confirmed:</div>
                                <div className={`${styles.data} ${styles["data-confirmed"]}`}>
                                    <span>{this.props.local.latest_data.confirmed}</span>
                                    <span>{this.props.local.today.confirmed}</span>
                                </div>
                            </div>
                            <div className={styles.category}>
                                <div className={styles["category-name"]}>Deaths:</div>
                                <div className={`${styles.data} ${styles["data-deaths"]}`}>
                                    <span>{this.props.local.latest_data.deaths}</span>
                                    <span>{this.props.local.today.deaths}</span>
                                </div>
                            </div>
                            <div className={styles.category}>
                                <div className={styles["category-name"]}>Recovered:</div>
                                <div className={`${styles.data} ${styles["data-recovered"]}`}>
                                    <span>{this.props.local.latest_data.recovered}</span>
                                </div>
                            </div>
                            <div className={styles.category}>
                                <div className={styles["category-name"]}>Active:</div>
                                <div className={`${styles.data} ${styles["data-active"]}`}>
                                    <span>{active}</span>
                                </div>
                            </div>
                            <div className={styles.category}>
                                <div className={styles["category-name"]}>Critical:</div>
                                <div className={`${styles.data} ${styles["data-critical"]}`}>
                                    <span>{this.props.local.latest_data.critical}</span>
                                </div>
                            </div>
                            <div className={styles.category}>
                                <div className={styles["category-name"]}>Cases per million:</div>
                                <div className={`${styles.data} ${styles["data-cpm"]}`}>
                                    <span>{this.props.local.latest_data.calculated.cases_per_million_population}</span>
                                </div>
                            </div>
                        </div>
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