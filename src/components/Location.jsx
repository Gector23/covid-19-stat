import React from 'react';
import Header from './Header';
import Loading from './Loading';
import styles from '../styles/Location.module.scss';

class Location extends React.Component {
    render() {
        let containerInner;

        if (Object.keys(this.props.localData).length) {
            containerInner = (
                <>
                    <Header header={this.props.localData.country}></Header>
                    <div className={styles.categories}>
                        <div className={styles.category}>
                            <div className={styles["category-name"]}>Confirmed:</div>
                            <div className={`${styles.data} ${styles["data-confirmed"]}`}>
                                <span>{this.props.localData.cases}</span>
                                <span>{this.props.localData.todayCases}</span>
                            </div>
                        </div>
                        <div className={styles.category}>
                            <div className={styles["category-name"]}>Deaths:</div>
                            <div className={`${styles.data} ${styles["data-deaths"]}`}>
                                <span>{this.props.localData.deaths}</span>
                                <span>{this.props.localData.todayDeaths}</span>
                            </div>
                        </div>
                        <div className={styles.category}>
                            <div className={styles["category-name"]}>Recovered:</div>
                            <div className={`${styles.data} ${styles["data-recovered"]}`}>
                                <span>{this.props.localData.recovered}</span>
                            </div>
                        </div>
                        <div className={styles.category}>
                            <div className={styles["category-name"]}>Existing:</div>
                            <div className={`${styles.data} ${styles["data-existing"]}`}>
                                <span>{this.props.localData.active}</span>
                            </div>
                        </div>
                        <div className={styles.category}>
                            <div className={styles["category-name"]}>Critical:</div>
                            <div className={`${styles.data} ${styles["data-critical"]}`}>
                                <span>{this.props.localData.critical}</span>
                            </div>
                        </div>
                    </div>
                </>
            );
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