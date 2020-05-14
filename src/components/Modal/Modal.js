import React from "react";
import styles from './Modal.module.css'
import {connect} from "react-redux";
import {updateModalStatus} from "../../Redux/main-reducer";

const Modal = ({Component, name, action, exitWOSave, data}) => {
    return (
        <div className={styles.modal}>
            <div className={styles.modalBlock}>
                <div className={styles.modalWindow}>
                    <div className={styles.modalHeader}>
                        <span className={styles.modalTitle}>
                            <h3>{name}</h3>
                        </span>
                        <span className={styles.closeModal}
                              onClick={exitWOSave}>
                            &times;
                        </span>
                    </div>
                    <div className={styles.content}>
                        <Component data={data}/>
                    </div>
                    <div className={styles.footer}>
                        <button onClick={() => action(data)}>
                            Завершить
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ModalContainer = (props) => {
    const {updateModalStatus, modalData} = props
    const exitWOSave = () => {
        let params = {
            status: false,
            ModalContentComponent: null,
            modalData: null,
            saveCallback: null
        };
        updateModalStatus(params)
    }

    return (
        <Modal exitWOSave={exitWOSave}
               Component={modalData.ModalContentComponent}
               name={modalData.name}
               action={modalData.saveCallback}
               data={modalData.modalProps}
        />
    )
}

let mapStateToProps = (state) => {
    return {
        modalData: state.main.modalData
    }
}

export default connect(mapStateToProps, {updateModalStatus})(ModalContainer)