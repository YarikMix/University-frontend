import {useEffect, useState} from "react";
import {Option, Response} from "../../../Types";
import {DOMEN, iFacultiesOptionsMock, requestTime} from "../../../Consts";
import axios from "axios";


const FacultiesMenu = ({ updateFaculties }: { updateFaculties: (faculties: number[]) => void}) => {
    const [faculties, setFaculties] = useState<Option[]>([]);
    const [selectedFaculties, setSelectedFaculties] = useState([-1]);

    const fetchData = async () => {
        try {
            const response: Response = await axios(`${DOMEN}/api/faculties/`, {
                method: "GET",
                signal: AbortSignal.timeout(requestTime)
            })

            if (response.status != 200){
                createMocks();
                return;
            }

            setFaculties(response.data)

        } catch (e) {

            createMocks()

        }
    }

    const createMocks = () => {
        setFaculties(iFacultiesOptionsMock)
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        updateFaculties(selectedFaculties)
    }, [selectedFaculties])

    const handleFilterButtonClick = (selectedFaculty: number) => {
        let faculties = []

        if (selectedFaculties.includes(selectedFaculty)){
            faculties = selectedFaculties.filter((el) => el !== selectedFaculty)
        } else {
            faculties = [...selectedFaculties, selectedFaculty ]
        }

        setSelectedFaculties(faculties)
    }

    return (
        <div className={"faculty-wrapper"}>
            <span>Факультет</span>

            <button
                key={-1}
                className={"faculty " + (selectedFaculties.includes(-1) ? "chosen" : "")}
                onClick={() => {
                    handleFilterButtonClick(-1)
                }}
            >
                Любой
            </button>


            {faculties.map(faculty => {
                return (

                    <button
                        key={faculty.id}
                        className={"faculty " + (selectedFaculties.includes(faculty.id) ? "chosen" : "")}
                        onClick={() => {
                            handleFilterButtonClick(faculty.id)
                        }}
                    >
                        {faculty.name}
                    </button>

                )
            })}

        </div>
    )
}

export default FacultiesMenu;