import React from 'react';
import Header from './Header';
import Loading from './Loading';
import Error from './Error';
import styles from '../styles/World.module.scss';

class World extends React.Component {
    render() {
        let containerInner;

        if (Object.keys(this.props.timeline).length) {
            if ("message" in this.props.timeline) {
                containerInner = <Error message={this.props.timeline.message}></Error>
            } else {
                containerInner = (
                    <>
                        <Header header="World"></Header>
                        <div className={styles.categories}>
                            <div className={styles.category}>
                                <span className={styles["category-name"]}>Confirmed:</span>
                                <span className={styles["data-confirmed"]}>
                                    {this.props.timeline.data[0].confirmed}
                                </span>
                            </div>
                            <div className={styles.category}>
                                <span className={styles["category-name"]}>Deaths:</span>
                                <span className={styles["data-deaths"]}>
                                    {this.props.timeline.data[0].deaths}
                                </span>
                            </div>
                            <div className={styles.category}>
                                <span className={styles["category-name"]}>Recovered:</span>
                                <span className={styles["data-recovered"]}>
                                    {this.props.timeline.data[0].recovered}
                                </span>
                            </div>
                            <div className={styles.category}>
                                <span className={styles["category-name"]}>Active:</span>
                                <span className={styles["data-active"]}>
                                    {this.props.timeline.data[0].active}
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