import React from "react";
import styles from './NewTodo.module.css'
import {connect} from "react-redux";
import {setDescription, setHeadText, setImportance} from "../../Redux/new-todo-reducer";
import {compose} from "redux";
import {addNewTodo} from "../../Redux/todo-reducer";

const NewTodoComponent = (props) => {
    let {
        newTodo,
        updateHeader, updateImportance,
        updateDescription, addTodo, userId
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

    }
    return (
        <form className={styles.newTodo} onSubmit={prepareData}>
            <div className={styles.mainBlock}>
                <div>
                    <h3>Добавление новой записи</h3>
                </div>
                <div>
                    <div>
                        <input
                            type={'text'}
                            value={newTodo.headText}
                            placeholder={'Header'}
                            onChange={(e) => onHeadChange(e)}
                        />
                    </div>
                    <div>
                        <textarea
                            placeholder={'Description'}
                            value={newTodo.description}
                            onChange={(e) => onDescriptionChange(e)}
                        />
                    </div>
                    <div>
                        <select value={newTodo.importance} onChange={(e) => onImportanceChange(e)}>
                            <option>High</option>
                            <option>Middle</option>
                            <option>Low</option>
                        </select>
                    </div>
                    <div>
                        <button>Add</button>
                    </div>
                </div>
            </div>
        </form>
    )
}

const NewTodo = (props) => {
    const {
        setHeadText, setImportance, setDescription, addNewTodo
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
        addNewTodo({userId, text, title, status, importance});
    }

    return (
        <NewTodoComponent
            {...props}
            updateHeader={updateHeader}
            updateImportance={updateImportance}
            updateDescription={updateDescription}
            addTodo={addTodo}
        />
    )
}

let mapStateToProps = (state) => {
    return {
        newTodo: state.newTodo,
        userId: state.usersData.userId
    }
}

export default compose(
    connect(mapStateToProps, {setHeadText, setDescription, setImportance, addNewTodo})
)(NewTodo);