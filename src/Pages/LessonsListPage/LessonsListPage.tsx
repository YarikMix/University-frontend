import "./LessonsListPage.sass"
import React from "react";
import Modal from "./Modal/Modal";
import {BasicTable} from "./BasicTable/BasicTable";


const LessonsListPage = () => {


	return (

		<div className="lessons-wrapper">

			<div className="bottom-container">

				<BasicTable />

			</div>

			<Modal />

		</div>
	)
}

export default LessonsListPage;