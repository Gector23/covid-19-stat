import React from 'react';
import Header from './Header';
import Loading from './Loading';
import Error from './Error';
import styles from '../styles/World.module.scss';

class World extends React.Component {
    render() {
        let containerInner;

        if (Object.keys(this.props.worldData).length) {
            if ("message" in this.props.worldData) {
                containerInner = <Error message={this.props.worldData.message}></Error>
            } else {
                containerInner = (
                    <>
                        <Header header="World"></Header>
                        <div className={styles.categories}>
                            <div className={styles.category}>
                                <span className={styles["category-name"]}>Confirmed:</span>
                                <span className={styles["data-confirmed"]}>
                                    {this.props.worldData.cases}
                                </span>
                            </div>
                            <div className={styles.category}>
                                <span className={styles["category-name"]}>Deaths:</span>
                                <span className={styles["data-deaths"]}>
                                    {this.props.worldData.deaths}
                                </span>
                            </div>
                            <div className={styles.category}>
                                <span className={styles["category-name"]}>Recovered:</span>
                                <span className={styles["data-recovered"]}>
                                    {this.props.worldData.recovered}
                                </span>
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

export default World;