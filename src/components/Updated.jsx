import React from 'react';
import styles from '../styles/Updated.module.scss';

function Updated(props) {
    return(
        <div className={styles.container}>
            {"Updated at " + props.update.toLocaleString()}
        </div>
    );
}

export default Updated;