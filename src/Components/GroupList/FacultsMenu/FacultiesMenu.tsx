import {useEffect, useState} from "react";
import {Option} from "../../../Types";
import {DOMEN, iFacultiesMock, requestTime} from "../../../Consts";


const FacultiesMenu = ({ updateFaculties }: { updateFaculties: (faculties: number[]) => void}) => {
    const [faculties, setFaculties] = useState<Option[]>([]);
    const [selectedFaculties, setSelectedFaculties] = useState([-1]);

    const fetchData = async () => {
        try {
            const response = await fetch(`${DOMEN}/api/facults/`, {
                method: "GET",
                signal: AbortSignal.timeout(requestTime)
            })

            if (!response.ok){
                createMocks();
                return;
            }

            const faculties: Option[] = await response.json()

            setFaculties(faculties)

        } catch (e) {

            createMocks()

        }
    }

    const createMocks = () => {
        setFaculties(iFacultiesMock)
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