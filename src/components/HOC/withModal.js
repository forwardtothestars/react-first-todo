import React from "react";
import {connect} from "react-redux";
import ModalComponent from "../Modal/Modal";

export const withModal = (Component) => {
    const NeedShowModal = (props) => {
        const {modalData, isModalOpen} = props
        if (isModalOpen) {
            return (<>
                    <ModalComponent {...modalData.modalProps} ChildCpmponent={modalData.ModalContentComponent}/>
                    <Component/>
                </>
            )
        }
        return <Component/>
    }

    let mapStateToProps = (state) => {
        return {
            isModalOpen: state.main.isModalOpen,
            modalData: state.main.modalData
        }
    }

    return connect(mapStateToProps)(NeedShowModal)
}