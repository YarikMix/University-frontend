import * as React from 'react'
import {Ref} from "react";
import "./FormInput.sass"

const FormInput = ({ name, placeholder, value, refer, onChange }: { name:string, placeholder:string, value:string, refer: Ref<HTMLInputElement>, onChange: React.ChangeEventHandler<HTMLInputElement>}) => {

    return (
        <div className={"form-input-wrapper"}>
            <label>{placeholder}</label>
            <input name={name} type="text" value={value} placeholder={placeholder} ref={refer} onChange={onChange}/>
        </div>
    )
}

export default FormInput;