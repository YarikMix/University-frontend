import * as React from 'react'
import {AiOutlineClose} from "react-icons/ai";
import {useContext} from "react";
import "./Modal.sass"
import CustomForm from "../CustomForm/CustomForm";
import {ModalContext} from "../GroupPage/GroupPage";

const Modal = () => {

    const wrapperRef = React.createRef<HTMLDivElement>();

    const { isModalOpen, setIsModalOpen } = useContext(ModalContext)

    return (
        <div className={"modal-wrapper " + (isModalOpen ? "active" : "")} onMouseDown={(event) => {
            if (!wrapperRef.current?.contains(event.target as Node)) {
                setIsModalOpen(false)
            }
        }}>
            <div className={"overlay"}>

            </div>

            <div className={"modal-content"} ref={wrapperRef}>

                <AiOutlineClose className={"close-button"} onClick={() => setIsModalOpen(false)}/>

                <CustomForm setIsModalOpen={setIsModalOpen}/>

            </div>
        </div>
    )
}

export default Modal;