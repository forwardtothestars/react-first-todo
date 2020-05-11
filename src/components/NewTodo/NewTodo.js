import React from "react";
import styles from './NewTodo.module.css'
import {connect} from "react-redux";
import {setAddNewTodoMenuVisible, setDescription, setHeadText, setImportance} from "../../Redux/new-todo-reducer";
import {compose} from "redux";
import {addNewTodo} from "../../Redux/todo-reducer";

const NewTodoComponent = (props) => {
    let {
        newTodo,
        updateHeader, updateImportance,
        updateDescription, addTodo, userId,
        blockVisible
    } = props;

    const onHeadChange = (e) => {
        updateHeader(e.target.value)
    }
    const onDescriptionChange = (e) => {
        updateDescription(e.target.value)
    }
    const onImportanceChange = (e) => {
        updateImportance(e.target.value)
    }
    const prepareData = (e) => {
        e.preventDefault();
        let params = {
            userId: userId,
            text: newTodo.description,
            title: newTodo.headText,
            status: 'active',
            importance: newTodo.importance
        }
        addTodo(params);
        updateHeader('')
        updateDescription('')
        updateImportance('High')
        blockVisible(false)

    }
    return (
        <form className={styles.form} onSubmit={prepareData}>
            <div className={newTodo.menuVisible ? styles.newTodo + ' ' + styles.newTodo_active : styles.newTodo}>
            <div className={styles.mainBlock}>
                <div>
                    <h3>Добавление новой записи</h3>
                </div>
                <div className={styles.input_data}>
                    <div className={styles.headText}>
                        <input className={styles.headText}
                            type={'text'}
                            value={newTodo.headText}
                            placeholder={'Header'}
                            onChange={(e) => onHeadChange(e)}
                        />
                    </div>
                    <div className={styles.description}>
                        <textarea className={styles.description}
                            placeholder={'Description'}
                            value={newTodo.description}
                            onChange={(e) => onDescriptionChange(e)}
                        />
                    </div>
                    <div className={styles.importance}>
                        <select className={styles.importance} value={newTodo.importance} onChange={(e) => onImportanceChange(e)}>
                            <option>High</option>
                            <option>Medium</option>
                            <option>Low</option>
                        </select>
                    </div>
                    <div className={styles.add__button_block}>
                        <button className={styles.button}>Add</button>
                    </div>
                </div>
            </div>
            </div>
        </form>
    )
}

const NewTodo = (props) => {
    const {
        setHeadText, setImportance, setDescription, addNewTodo, viewMode,
        setAddNewTodoMenuVisible
    } = props

    const updateHeader = (value) => {
        setHeadText(value)
    }
    const updateImportance = (value) => {
        setImportance(value)
    }
    const updateDescription = (value) => {
        setDescription(value)
    }

    const addTodo = ({userId, text, title, status, importance}) => {
        addNewTodo({userId, text, title, status, importance}, viewMode);
    }

    return (
        <NewTodoComponent
            {...props}
            updateHeader={updateHeader}
            updateImportance={updateImportance}
            updateDescription={updateDescription}
            addTodo={addTodo}
            blockVisible={setAddNewTodoMenuVisible}
        />
    )
}

let mapStateToProps = (state) => {
    return {
        newTodo: state.newTodo,
        userId: state.usersData.userId,
        viewMode: state.todoData.viewMode
    }
}

export default compose(
    connect(mapStateToProps, {setHeadText, setDescription, setImportance, addNewTodo,
        setAddNewTodoMenuVisible})
)(NewTodo);