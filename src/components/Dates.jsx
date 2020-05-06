import React from 'react';
import styles from '../styles/Dates.module.scss';

class Dates extends React.Component {
    handleDayClick(day) {
        this.props.onDayChange(day);
    }

    render() {
        let dates = this.props.days.map( (day, index) => {
            const classes = index === this.props.day ? `${styles.date} active-element` : styles.date;

            return (
                <div className={classes} key={index} onClick={() => this.handleDayClick(index)}>{day.updated_at.getDate()}</div>
            );
        });

        return(
            <div className={styles.dates}>
                {dates}
            </div>
        );
    }
}

export default Dates;