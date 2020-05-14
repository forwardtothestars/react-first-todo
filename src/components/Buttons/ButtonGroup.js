import React from "react";
import styles from "../Buttons/ButtonGroup.module.css";

const ButtonGroupMenu = (props) => {
    const {items, viewMode} = props
    return (
        <div className={styles.buttonGroup}>
            <div className={styles.buttonGroup_items}>
                {
                    items.sort((a, b) => a.id - b.id).map((item) => {
                        return (
                            <button onClick={item.callback}
                                    disabled={viewMode === item.mode}
                                    key={item.id}>
                                {item.label}
                            </button>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ButtonGroupMenu;
