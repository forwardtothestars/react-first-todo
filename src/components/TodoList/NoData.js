import React from "react";
import styles from "./TodoList.module.css"

const NoData = () => {
    return (
        <div className={styles.todo}>
            <div className={styles.noData}>
                <div className={styles.noData_item}>
                    <div>
                        <h3>No data</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoData