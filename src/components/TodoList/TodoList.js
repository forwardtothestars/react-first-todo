import React, {useEffect} from "react";
import styles from "./TodoList.module.css"
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {getTodos, removeTodo, setViewMode, updateTodo} from "../../Redux/todo-reducer";
import Preloader from "../Preloader/Preloader";
import NoData from "./NoData";
import {setUserId} from "../../Redux/users-reducer";
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import EditIcon from '@material-ui/icons/Edit';
import ButtonGroupMenu from "../Buttons/ButtonGroup";
import {setAddNewTodoMenuVisible} from "../../Redux/new-todo-reducer";
import {updateModalStatus} from "../../Redux/main-reducer";
import EditTodo from "../EditTodo/EditTodo";

const TodoListComponent = (props) => {
    const {
        todoList, deleteTodo, modifyTodo, buttons,
        viewMode, editTodo
    } = props

    const onRemoveAction = (noteId) => {
        deleteTodo(noteId);
    }
    const onSetComplete = (noteId) => {
        modifyTodo(noteId, {status: 'complete'})
    }
    const onEditAction = (note) => {
        editTodo(note)
    }

    const checkPriority = (importance) => {
        let element = (style) => {
            return (
                <div className={styles.todo_item__priority + ' ' + style}>
                </div>
            )
        }

        switch (importance) {
            case 'High':
                return element(styles.color_red)
            case 'Medium':
                return element(styles.color_yellow)
            case 'Low':
                return element(styles.color_green)
            default:
                return null
        }
    }

    return (
        <div className={styles.todo}>
            <ButtonGroupMenu items={buttons}
                             viewMode={viewMode}/>
            <div className={styles.todo_items}>
                {todoList.map(item => {
                    return (
                        <div className={styles.todo__item} key={item._id}>

                            {checkPriority(item.importance)}
                            <div className={styles.item__textInfo}>
                                <span>
                                    <h2>{item.title}</h2>
                                </span>
                                <div className={styles.item__description}>
                                    {item.text}
                                </div>
                            </div>
                            <div className={styles.item_buttons_row}>
                                <button onClick={() => onEditAction(item)} className={styles.edit_button}>
                                    <EditIcon className={styles.icon} color={'action'} fontSize="small"/>
                                </button>
                                <button onClick={() => onSetComplete(item._id)} className={styles.done_button}>
                                    <CheckIcon className={styles.icon} color={'action'} fontSize="small"/>
                                </button>
                                <button onClick={() => onRemoveAction(item._id)} className={styles.delete_button}>
                                    <CloseIcon className={styles.icon} color={'action'} fontSize="small"/>
                                </button>
                            </div>
                        </div>
                    )
                })

                }
            </div>
        </div>
    )
}

export const TodoList = (props) => {
    const {
        match, isFetching, todoList,
        getTodos, setUserId, removeTodo,
        updateTodo, setViewMode, viewMode,
        setAddNewTodoMenuVisible, updateModalStatus
    } = props
    const currentUserId = match.params.userId

    const buttons = [
        {
            id: 2,
            label: 'Completed',
            mode: 'complete',
            callback: () => {
                setViewMode('complete')
                getTodos(currentUserId, 'complete')
            }
        },
        {
            id: 1,
            label: 'Active',
            mode: 'active',
            callback: () => {
                setViewMode('active')
                getTodos(currentUserId, 'active')
            }
        },
        {
            id: 3,
            label: 'Add new todo',
            callback: () => {
                setAddNewTodoMenuVisible(true)
            }
        },
    ]

    useEffect(() => {
        if (currentUserId) {
            setUserId(currentUserId)
            getTodos(currentUserId, viewMode)
        }
    }, [currentUserId]);

    const deleteTodo = (noteId) => {
        removeTodo(noteId, currentUserId, viewMode)
    }

    const modifyTodo = (noteId, params) => {
        updateTodo(noteId, params, currentUserId, viewMode)
    }

    const saveChanges = (modalData) => {
        
        let data = {
            title: modalData.title,
            text: modalData.text,
            importance: modalData.importance
        }
        let params = {
            status: false,
            ModalContentComponent: null,
            modalData: null,
            saveCallback: null
        };
        let {_id, userId, viewMode} = modalData
        updateTodo(_id, data, userId, viewMode)
        updateModalStatus(params)

    }

    const editTodo = (todoData) => {
        let params = {
            status: true,
            ModalContentComponent: EditTodo,
            saveCallback: saveChanges,
            name: 'Edit note',
            modalData: {...todoData, userId: currentUserId, viewMode},
        };
        updateModalStatus(params)
    }

    const checkTodoList = () => {
        if (todoList.length === 0) {
            return <NoData viewMode={viewMode}
                           buttons={buttons}/>
        }
        return <TodoListComponent todoList={todoList}
                                  deleteTodo={deleteTodo}
                                  modifyTodo={modifyTodo}
                                  editTodo={editTodo}
                                  buttons={buttons}
                                  viewMode={viewMode}/>
    }

    return (<>
            {isFetching
                ? <Preloader/>
                : checkTodoList()}
        </>
    )
}

let mapStateToProps = (state) => {
    return {
        isFetching: state.main.isFetching,
        todoList: state.todoData.todoList,
        viewMode: state.todoData.viewMode,
        editTodoData: state.todoData.editTodoData
    }
}

export default compose(
    withRouter,
    connect(mapStateToProps, {
        getTodos, setUserId,
        removeTodo, updateTodo, setViewMode,
        setAddNewTodoMenuVisible, updateModalStatus
    }))(TodoList)