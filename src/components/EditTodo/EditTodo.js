import React, {useState} from "react";
import styles from "./EditTodo.module.css";
import {connect} from "react-redux";
import {setEditTodoImportance, setEditTodoText, setEditTodoTitle} from "../../Redux/main-reducer";

const EditTodo = (props) => {
    const {data, setEditTodoTitle, setEditTodoText, setEditTodoImportance} = props
    const [headText, setHeadText] = useState(data.title)
    const [description, setDescription] = useState(data.text)
    const [priority, setPriority] = useState(data.importance)

    const onHeadChange = (e) => {
        setHeadText(e.target.value)
        setEditTodoTitle(e.target.value)
    }
    const onDescriptionChange = (e) => {
        setDescription(e.target.value)
        setEditTodoText(e.target.value)
    }
    const onImportanceChange = (e) => {
        setPriority(e.target.value)
        setEditTodoImportance(e.target.value)
    }

    return (
        <>
            <div className={styles.input_data}>
                <div>
                    <input className={styles.headText}
                           type={'text'}
                           value={headText}
                           placeholder={'Header'}
                           onChange={(e) => onHeadChange(e)}
                    />
                </div>
                <div>
                <textarea className={styles.description}
                          placeholder={'Description'}
                          value={description}
                          onChange={(e) => onDescriptionChange(e)}
                />
                </div>
                <div>
                    <select className={styles.importance}
                            value={priority}
                            onChange={(e) => onImportanceChange(e)}>
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                    </select>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        modalData: state.main.modalData
    }
}

export default connect(mapStateToProps, {
    setEditTodoTitle,
    setEditTodoText, setEditTodoImportance
})(EditTodo)