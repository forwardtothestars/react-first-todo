import React from "react";
import styles from './Header.module.css'
import AddUser from "./AddUser";

const Header = (props) => {

    return (
        <header className={styles.header}>

            <AddUser/>
            <div className={styles.header_blocks}>
                <span>TODO</span>
            </div>
        </header>
    )
}

export default Header;