import React, {useState} from "react";
import styles from "./Header.module.css";
import {connect} from "react-redux";
import {userCreate} from "../../Redux/main-reducer";

const AddUser = ({userCreate}) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [photoURL, setPhotoURL] = useState('')
    const createUser = (e) => {
        e.preventDefault()
        userCreate(firstName, lastName, photoURL)
        //clear local state
        setFirstName('')
        setLastName('')
        setPhotoURL('')
    }
    const onChangeFirstName = (e) => {
        setFirstName(e.target.value)
    }
    const onChangeLastName = (e) => {
        setLastName(e.target.value)
    }
    const onChangePhotoURL = (e) => {
        setPhotoURL(e.target.value)
    }


    return (
        <form onSubmit={createUser}>
            <div className={styles.input_user}>
                <div>
                    <button>Add user</button>
                </div>
                <div><input value={firstName} onChange={(e) => onChangeFirstName(e)} placeholder={'First name'}/></div>
                <div><input value={lastName} onChange={(e) => onChangeLastName(e)} placeholder={'Last name'}/></div>
                <div><input value={photoURL} onChange={(e) => onChangePhotoURL(e)} placeholder={'Photo URL'}/></div>
            </div>
        </form>
    )
}


export default connect(undefined, {userCreate})(AddUser)