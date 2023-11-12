import "./Trash.sass"
import React from "react";
import {FaTrash} from "react-icons/fa6";

const Trash = ({ onClick }: {onClick: () => void}) => {
	return (
		<div className="delete-btn-wrapper" onClick={onClick}>
			<span>Удалить</span>
			<FaTrash />
		</div>
	)
}



export default Trash;