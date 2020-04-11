import React from 'react';
import Header from './Header';
import styles from '../styles/World.module.scss';

class World extends React.Component {
    render() {
        return(
            <div className={styles.container}>
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
            </div>
        );
    }
}

export default World;