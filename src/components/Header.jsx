import React from 'react';
import styles from '../styles/Header.module.scss';

function Header(props) {
    return (
        <div className={styles.container}>
            {props.header}
        </div>
    );
}

export default Header;