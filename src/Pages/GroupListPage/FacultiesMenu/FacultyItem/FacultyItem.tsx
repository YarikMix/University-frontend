import "./FacultyItem.sass"
import {useEffect, useState} from "react";
import {useGroupFilters} from "../../../../hooks/useGroupFilters";
import {Faculty} from "../../../../Types";

const FacultyItem = ({faculty}:{faculty:Faculty}) => {

	const {selectedFaculties, setSelectedFaculties} = useGroupFilters()

	const [selected, setSelected] = useState(false)

	const handleClick = () => {
		let faculties = []

		setSelected(!selectedFaculties.includes(faculty.id))

		if (selected){
			faculties = selectedFaculties.filter((el) => el !== faculty.id)
		} else {
			faculties = [...selectedFaculties, faculty.id ]
		}

		setSelectedFaculties(faculties)
	}

	useEffect(() => {
		setSelected(selectedFaculties.includes(faculty.id))
	}, [])

	return (
		<button className={"faculty " + (selected ? "chosen" : "")} onClick={handleClick}>
			{faculty.name}
		</button>
	)
}

export default FacultyItem;