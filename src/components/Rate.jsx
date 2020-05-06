import React from 'react';
import styles from '../styles/Rate.module.scss';

class Rate extends React.Component {
    constructor(props) {
        super(props);

        this.recoveryRef = React.createRef();
        this.deathsRef = React.createRef();
        this.activeRef = React.createRef();

        this.rate = {};
    }

    componentDidMount() {
        setTimeout(() => {
            this.recoveryRef.current.style.width = `${this.rate.recovery}%`;
            this.deathsRef.current.style.width = `${this.rate.deaths}%`;
            this.activeRef.current.style.width = `${this.rate.active}%`;
        }, 1000);
    }

    componentDidUpdate() {
        this.recoveryRef.current.style.width = `${this.rate.recovery}%`;
        this.deathsRef.current.style.width = `${this.rate.deaths}%`;
        this.activeRef.current.style.width = `${this.rate.active}%`;
    }
        
    render() {
        this.rate.recovery = (Math.round(this.props.days[this.props.day].recovered.origin / (this.props.days[this.props.day].confirmed.origin / 100) * 100) / 100);
        this.rate.deaths = (Math.round(this.props.days[this.props.day].deaths.origin / (this.props.days[this.props.day].confirmed.origin / 100) * 100) / 100);
        this.rate.active = (Math.round((100 - this.rate.recovery - this.rate.deaths) * 100) / 100);

        return (
            <div className={styles.container}>
                <div className={styles.graph}>
                    <div className={`${styles.row} ${styles["recovery-row"]}`} ref={this.recoveryRef}></div>
                    <div className={`${styles.row} ${styles["deaths-row"]}`} ref={this.deathsRef}></div>
                    <div className={`${styles.row} ${styles["active-row"]}`} ref={this.activeRef}></div>      
                </div>
                <div className={styles.categories}>
                    <div className={styles.category}>
                        <span className={styles["category-name"]}>Recovery rate:</span>
                        <span className="recovered">{this.rate.recovery + "%"}</span>
                    </div>
                    <div className={styles.category}>
                        <span className={styles["category-name"]}>Deaths rate:</span>
                        <span className="deaths">{this.rate.deaths + "%"}</span>
                    </div>
                    <div className={styles.category}>
                        <span className={styles["category-name"]}>Active rate:</span>
                        <span className="active">{this.rate.active + "%"}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Rate;