import React from "react";
import styles from './Header.module.css'

const Header = (props) => {

    return (
        <header className={styles.header}>
            <div className={styles.fixed_block}>
                <div className={styles.header_blocks}>
                    <span>TODO</span>
                </div>
            </div>
        </header>
    )
}

export default Header;