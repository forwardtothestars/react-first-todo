import loading from "../../assets/preloader.gif";
import React from "react";
import styles from "./Preloader.module.css"

const Preloader = (props) => {
    return (
        <div className={styles.imageBlock}>
            <img src={loading} alt={''} className={styles.loader}/>
        </div>
    )
}

export default Preloader;
