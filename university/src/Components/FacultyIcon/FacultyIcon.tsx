import * as React from 'react'
import {useEffect, useState} from "react";
import logo from "./logo.png"

const GroupList = ({ faculty_id }: {faculty_id:number}) => {
    const [img, setImg] = useState<string | undefined>(undefined);

    /*
        const fetchImage = async () => {
            const response = await fetch("http://127.0.0.1:8000/api/facults/" + props.faculty_id + "/icon");

            if (!response.ok)
                throw new Error(response.statusText);

            const imageBlob = await response.blob();
            const imageObjectURL = URL.createObjectURL(imageBlob);
            setImg(imageObjectURL);
        };
    */

    const fetchImage = async () => {
        fetch("http://127.0.0.1:8000/api/facults/" + faculty_id + "/icon")
            .then((response) => {
                if (!response.ok){
                    throw new Error(response.statusText);
                }

                response.blob().then((imageBlob) => {
                    const imageObjectURL = URL.createObjectURL(imageBlob);
                    setImg(imageObjectURL);
                    return;
                })
            })
            .catch((error) => {
                setImg(logo)
        });
    };

    useEffect(() => {

        fetchImage();

    }, [])

    return (
        <div className={"faculty-image-container"}>
            <img className="faculty-image" src={img}/>
        </div>
    );
}

export default GroupList;