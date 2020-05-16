import React, {useState} from "react";
import styles from "./Users.module.css";
import {userCreate} from "../../Redux/main-reducer";
import {connect} from "react-redux";

const NewUser = ({userCreate}) => {
    const [hiddenBlock, setHiddenBlock] = useState(true);
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
        setHiddenBlock(true)
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
    const onAddUserClick = () => {
        setHiddenBlock(!hiddenBlock);
    }

    return (
        <div className={styles.addNewUserBlock}>
            <div
                className={hiddenBlock ? styles.addUser_action : [styles.addUser_action, styles.addUser_action_active].join(' ')}
                onClick={onAddUserClick}>
                <span className={styles.addUserSpn}>Add new User</span>
            </div>
            <div
                className={hiddenBlock ? styles.hiddenBlock : [styles.hiddenBlock, styles.hiddenBlock_active].join(' ')}>
                {!hiddenBlock &&
                <>
                    <input className={styles.firstNameInput}
                           placeholder={'First Name'}
                           value={firstName}
                           onChange={onChangeFirstName}/>
                    <input placeholder={'Last Name'}
                           value={lastName}
                           onChange={onChangeLastName}/>

                    <input placeholder={'Photo URL'}
                           value={photoURL}
                           onChange={onChangePhotoURL}/>

                    <button className={styles.addButton}
                            onClick={createUser}>Save
                    </button>
                </>
                }
            </div>
        </div>
    )
}

export default connect(undefined, {userCreate})(NewUser);