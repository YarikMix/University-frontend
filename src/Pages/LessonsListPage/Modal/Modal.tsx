import * as React from 'react'
import {AiOutlineClose} from "react-icons/ai";
import "./Modal.sass"
import LessonForm from "./LessonForm/LessonForm";
import {useLessonForm} from "../../../hooks/useLessonForm";

const Modal = () => {

    const { isOpen, closeForm } = useLessonForm()

    return (
        <div className={"modal-wrapper " + (isOpen ? "active" : "")} >
            <div className={"overlay"} onClick={closeForm}>

            </div>

            <div className={"modal-content"}>

                <AiOutlineClose className={"close-button"} onClick={closeForm} />

                <LessonForm />

            </div>
        </div>
    )
}

export default Modal;