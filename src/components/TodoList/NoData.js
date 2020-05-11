import React from "react";
import styles from "./TodoList.module.css"
import ButtonGroupMenu from "../Buttons/ButtonGroup";

const NoData = ({buttons, viewMode}) => {
    return (
        <div className={styles.todo}>
            <ButtonGroupMenu items={buttons}
                             viewMode={viewMode}/>
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