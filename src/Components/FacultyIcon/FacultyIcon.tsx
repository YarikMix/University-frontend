import {useEffect, useState} from "react";
import logo from "./logo.png"
import {DOMEN, requestTime} from "../../Consts";

const FacultyIcon = ({ faculty_id }: {faculty_id:number}) => {

    const [img, setImg] = useState<string | undefined>(undefined);

    const fetchImage = async () => {

        try {

            if (faculty_id == null){
                MockIcon()
                return;
            }

            const response = await fetch(`${DOMEN}/api/facults/${faculty_id}/icon`, {
                method: "GET",
                signal: AbortSignal.timeout(requestTime)
            });

            if (!response.ok){
                MockIcon()
            }

            const imageBlob = await response.blob()

            const imageObjectURL = URL.createObjectURL(imageBlob)

            setImg(imageObjectURL)

        } catch (e) {

            MockIcon()

        }
    };

    const MockIcon = () => {
        setImg(logo)
    }

    useEffect(() => {

        fetchImage();

    }, [])

    return (
        <div className={"faculty-image-container"}>
            <img className="faculty-image" src={img}/>
        </div>
    );
}

export default FacultyIcon;