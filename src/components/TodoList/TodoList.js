import React, {useEffect} from "react";
import styles from "./TodoList.module.css"
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {getTodos} from "../../Redux/todo-reducer";
import Preloader from "../Preloader/Preloader";
import NoData from "./NoData";
import {setUserId} from "../../Redux/users-reducer";

const TodoListComponent = (props) => {
    const {todoList} = props

    return (
        <div className={styles.todo}>
            <div className={styles.todo_items}>
                {todoList.map(item => {
                    return (
                        <div className={styles.todo__item} key={item._id}>

                            <div>
                                <span>
                                    <input type={'checkbox'}/>
                                </span>
                            </div>
                            <div>
                                <h2>{item.title}</h2>
                                <div className={styles.item__description}>{item.text}</div>
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
    const {match, isFetching, todoList, getTodos, setUserId} = props

    useEffect(() => {
        if (match.params.userId) {
            setUserId(match.params.userId)
            getTodos(match.params.userId)
        }
    }, [match.params.userId]);

    const checkTodoList = () => {
        if (todoList.length === 0) {
            return <NoData/>
        }
        return <TodoListComponent todoList={todoList}/>
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
        todoList: state.todoData.todoList
    }
}

export default compose(withRouter, connect(mapStateToProps, {getTodos, setUserId}))(TodoList)