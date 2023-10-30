import "./LessonsList.sass"
import {AnimatePresence, motion} from "framer-motion";
import React, {useEffect} from "react";
import LessonCard from "./LessonCard/LessonCard";
import Modal from "./Modal/Modal";
import axios from "axios";
import {DOMEN} from "/src/Consts";
import {useToken} from "/src/hooks/useToken";
import {useLessons} from "../../hooks/useLessons";
import {Response} from "../../Types";


const LessonsList = () => {

	const {lessons, setLessons} = useLessons()

	const {token} = useToken()

	const fetchLessons = async () => {

		try {

			const response: Response = await axios(`${DOMEN}/api/lessons/`, {
				method: "GET",
				headers: {
					"Content-type": "application/json; charset=UTF-8",
					'authorization': `${token}`
				}
			})

			setLessons(response.data)

		} catch (e) {

		}

	}

	useEffect(() => {
		fetchLessons()
	}, [])

	const cards = lessons.map(lesson  => (
		<LessonCard lesson={lesson} setLessons={setLessons} key={lesson.id}/>
	))

	return (

		<div className="lessons-wrapper">

			<div className="top-container">

				<h3>Ваши занятия</h3>

			</div>

			<motion.div className="bottom-container">

				<AnimatePresence>

					{ cards }

				</AnimatePresence>

			</motion.div>

			<Modal />

		</div>
	)
}

export default LessonsList;