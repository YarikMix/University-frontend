import {useEffect} from "react";
import {Response} from "../../../Types";
import {DOMEN, FacultyItemAny} from "../../../Consts";
import axios from "axios";
import {useGroupFilters} from "../../../hooks/useGroupFilters";
import FacultyItem from "./FacultyItem/FacultyItem";


const FacultiesMenu = () => {
    const {faculties, setFaculties} = useGroupFilters()

    const fetchData = async () => {
        try {
            const response: Response = await axios(`${DOMEN}/api/faculties/`, {
                method: "GET"
            })

            if (response.status == 200){
                setFaculties(response.data)
            }

        } catch (e) {


        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const items = faculties.map(faculty => (
        <FacultyItem faculty={faculty} key={faculty.id} />
    ))

    return (
        <div className={"faculty-wrapper"}>
            <span>Факультет</span>

            <FacultyItem faculty={FacultyItemAny} />

            { items }

        </div>
    )
}

export default FacultiesMenu;