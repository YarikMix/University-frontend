import logo from "/src/assets/logo.png"

const FacultyIcon = ({ faculty_id, isMock }: { faculty_id:number, isMock: boolean }) => {

    const img = `http://127.0.0.1:8000/api/faculties/${faculty_id}/icon/`

    return (
        <div className={"faculty-image-container"}>
            <img className="faculty-image" src={isMock ? logo : img}/>
        </div>
    );
}

export default FacultyIcon;