import {Faculty} from "../../Types";

const FacultyIcon = ({ faculty }: { faculty:Faculty }) => {

    const img = `http://127.0.0.1:8000/api/faculties/${faculty.id}/icon/`

    return (
        <div className={"faculty-image-container"}>
            <img className="faculty-image" src={img} alt=""/>
        </div>
    );
}

export default FacultyIcon;