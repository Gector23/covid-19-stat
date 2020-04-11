import React from 'react';
import styles from '../styles/Error.module.scss';

function Error(props) {
    return (
        <div className={styles.container}>{props.message}</div>
    );
}

export default Error;