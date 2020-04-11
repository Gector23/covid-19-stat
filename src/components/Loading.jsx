import React from 'react';
import styles from '../styles/Loading.module.scss';

function Loading() {
    return (
        <div className={styles.container}>
            <div className={styles.spinner}></div>
        </div>
    );
}

export default Loading;