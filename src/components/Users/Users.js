import React from "react";
import styles from './Users.module.css'
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import NewUser from "./NewUser";

const Users = (props) => {

    const {users, isRightMenuOpen} = props
    return (
        <div className={isRightMenuOpen ? [styles.users, styles.users_active].join(' ') : styles.users}>
            <NewUser/>
            <div className={styles.users__items}>
                {users.map(item => {
                    return (
                        <NavLink className={styles.users__item} to={`/todolist/${item._id}`} key={item._id}>
                            <div><img src={item.photo} alt={''}/></div>
                            <div><span>{item.firstName} {item.lastName}</span></div>
                        </NavLink>
                    )
                })
                }
            </div>
        </div>
    )
}

let mapStateToProps = (state) => {
    return {
        users: state.usersData.users,
        isRightMenuOpen: state.main.isRightMenuOpen
    }
}

export default connect(mapStateToProps, {})(Users);