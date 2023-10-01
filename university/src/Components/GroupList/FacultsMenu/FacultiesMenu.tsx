import * as React from 'react'
import {useEffect, useState} from "react";
import {Option} from "../../../Types";


const FacultiesMenu = ({ updateFaculties }: { updateFaculties: (faculties: number[]) => void}) => {
    const [faculties, setFaculties] = useState<Option[]>([]);
    const [selectedFaculties, setSelectedFaculties] = useState([-1]);

    const fetchData = () => {
        fetch("http://127.0.0.1:8000/api/facults/")
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }

                throw new Error('Something went wrong');
            })
            .then((results) => setFaculties(results))
            .catch((error) => {
                console.log("error!")
                const mockFaculty:Option = {
                    id: -2,
                    name: "Тест"
                }

                setFaculties([mockFaculty])
            });
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