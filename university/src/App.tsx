import "./Styles/Main.sass"
import "./Styles/Reset.sass"
import "./Styles/Fonts.sass"
import {BrowserRouter, Navigate, Outlet, Route, Routes} from 'react-router-dom';
import Header from "./Components/Header/Header";
import GroupList from "./Components/GroupList/GroupList";
import Breadcrumbs from "./Components/Breadcrumbs/Breadcrumbs";
import * as React from "react";
import {SelectedGroupContextType, iSelectedGroupContextState,  Group} from "./Types";
import {useEffect, useState} from "react";
import GroupPage from "./Components/GroupPage/GroupPage";


export const GroupContext = React.createContext<SelectedGroupContextType>(iSelectedGroupContextState)



const Main = () => {

    const [selectedGroup, setSelectedGroup] = useState<Group | null>(null)

    return (
        <GroupContext.Provider value={{selectedGroup, setSelectedGroup}}>
            <div>

                <div className="wrapper">

                    <Header />

                    <div className={"content-wrapper"}>

                        <Breadcrumbs/>

                        <Outlet />

                    </div>

                </div>

            </div>
        </GroupContext.Provider>
    );
}


const App = () => {
    return (
        <BrowserRouter>

            <div className="App">

                <Routes>

                    <Route path="/" element={<Navigate to="/groups" replace />} />

                    <Route path="/groups" element={<Main />} >

                        <Route path="/groups" >
                            <Route path=":id" element={<GroupPage />} />
                        </Route>

                        <Route index element={<GroupList />} />

                    </Route>

                </Routes>

            </div>

        </BrowserRouter>
  );
}

export default App;
