import './Styles/Main.sass'
import './Styles/Reset.sass'
import './Styles/Fonts.sass'
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import Header from "./Components/Header/Header";
import GroupList from "./Components/GroupList/GroupList";
import Breadcrumbs from "./Components/Breadcrumbs/Breadcrumbs";
import {useState} from "react";
import {Group} from "./Types";
import GroupPage from "./Components/GroupPage/GroupPage";


function App() {

	const [selectedGroup, setSelectedGroup] = useState<Group | undefined>(undefined)

	return (

		  <div className="App">

			  <div className="wrapper">

				  <Header />

				  <div className={"content-wrapper"}>

					  <BrowserRouter basename="/university">

						  <Breadcrumbs selectedGroup={selectedGroup} setSelectedGroup={setSelectedGroup}/>

						  <Routes>

							  <Route path="/" element={<Navigate to="/groups" replace />} />

							  <Route path="/groups" element={<GroupList />} />

							  <Route path="/groups/:id" element={<GroupPage selectedGroup={selectedGroup} setSelectedGroup={setSelectedGroup} />} />

						  </Routes>

					  </BrowserRouter>

				  </div>

			  </div>

		  </div>

  )
}

export default App
