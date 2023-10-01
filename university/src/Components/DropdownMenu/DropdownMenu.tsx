import * as React from 'react'
import {useState} from "react";
import {FaCaretDown} from "react-icons/fa";
import {DropdownMenuList} from "../../Types";
import "./DropdownMenu.sass"


const DropdownMenu = ({ options, defaultTitle, appendDefaultTitle, setSelectedOption }: DropdownMenuList) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(defaultTitle)


    return (
        <div className={"dropdown " + (isExpanded ? 'show' : 'hidden')} >
            <button className={"select"} onClick={() => setIsExpanded(!isExpanded)}>
                <span className={"selected"}>{title}</span>
                <FaCaretDown className={"caret"} />
            </button>

            <ul className={"menu"}>

                <li onClick={() => {
                    setIsExpanded(false)
                    setSelectedOption(-1)
                    setTitle("Любой " + defaultTitle.toLowerCase())
                }}
                    key={-1}>
                    Любой
                </li>

                    {
                        options.map(option => {
                            return (
                                <li onClick={() => {
                                    setIsExpanded(false)
                                    setSelectedOption(option.id)
                                    setTitle(option.name + (appendDefaultTitle ? (" " + defaultTitle.toLowerCase()) : ""))
                                }}
                                    key={option.id}>
                                    {option.name}
                                </li>
                            )
                        })
                    }

            </ul>
        </div>
    );
}

export default DropdownMenu;