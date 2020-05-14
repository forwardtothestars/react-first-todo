import React, {useEffect} from "react";

import {Route, withRouter} from "react-router-dom";
import {Switch} from "react-router";
import './App.css'
import Header from "./components/Header/Header";
import TodoList from "./components/TodoList/TodoList";
import Users from "./components/Users/Users";
import NewTodo from "./components/NewTodo/NewTodo";
import {compose} from "redux";
import {connect} from "react-redux";
import {initializedUsers} from "./Redux/main-reducer";
import Preloader from "./components/Preloader/Preloader";
import {withModal} from "./components/HOC/withModal";

function App(props) {
    const {main, initializedUsers} = props;
    useEffect(() => {
        initializedUsers();
    }, []);

    const checkInitialized = () => {
        if (main.isInitialized) {
            return true
        }
    }
    return (
        <>
            {checkInitialized() ? <Preloader/>
                :
                <div className={'main_block'} onresize={() => console.log('change')}>
                    <Header/>
                    <Users/>
                    <Switch>
                        <Route path={"/todolist/:userId?"} render={() => <TodoList/>}/>
                    </Switch>
                    <NewTodo/>
                </div>
            }
        </>
    );
}

let mapStateToProps = (state) => {
    return {
        main: state.main
    }
}

export default compose(
    withModal,
    withRouter,
    connect(mapStateToProps, {initializedUsers})
)(App);
