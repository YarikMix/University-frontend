import * as React from 'react'
import {MdOutlineWorkHistory} from "react-icons/md";
import {FaRegStickyNote} from "react-icons/fa";
import {AiOutlineClose, AiFillCheckCircle, AiFillDelete} from "react-icons/ai";
import {ImCancelCircle} from "react-icons/im";
import "./Modal.sass"
import {useModal} from "/src/hooks/useModal";
import useComponentVisible from "/src/hooks/useComponentVisible";
import LessonForm from "./LessonForm/LessonForm";

const Modal = () => {

    const { isOpen, setIsOpen } = useModal()

    const closeModal = () => {
        setIsOpen(false)
    }

    const { ref } = useComponentVisible(setIsOpen);

    return (
        <div className={"modal-wrapper " + (isOpen ? "active" : "")} >
            <div className={"overlay"}>

            </div>

            <div className={"modal-content"} ref={ref}>

                <AiOutlineClose className={"close-button"} onClick={closeModal} />

                <LessonForm closeModal={closeModal}/>

            </div>
        </div>
    )
}

export default Modal;