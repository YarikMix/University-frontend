import './Styles/Main.sass'
import './Styles/Reset.sass'
import './Styles/Fonts.sass'
import {BrowserRouter, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import Header from "./Components/Header/Header";
import GroupList from "./Components/GroupList/GroupList";
import Breadcrumbs from "./Components/Breadcrumbs/Breadcrumbs";
import GroupPage from "./Components/GroupPage/GroupPage";
import Home from "./Components/Home/Home";
import LessonsList from "./Components/LessonsList/LessonsList";
import SignIn from "./Components/Login/SignIn/SignIn";
import SignUp from "./Components/Login/SignUp/SignUp";
import {Provider} from "react-redux"
import store from "./store/store"
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Profile from "./Components/Profile/Profile";

const LoginFormLayout = () => {
	return (
		<div className="login-wrapper">
			<Outlet />
		</div>
	)
}

function App() {
	return (
		<Provider store={store}>

			<BrowserRouter basename="/university">

				<div className="App">

					<div className="wrapper">

						<ToastContainer />

						<Header />

						<div className={"content-wrapper"}>

							<Breadcrumbs />

							<Routes>

								<Route path="/home" element={<Home />} />

								<Route path="/" element={<Navigate to="/home" replace />} />


								<Route path="/auth/" element={<LoginFormLayout />} >

									<Route path="" element={<Navigate to="login/" replace />} />

									<Route path="login/" element={<SignIn />} />

									<Route path="register/" element={<SignUp />} />

								</Route>


								<Route path="/profile" element={<Profile />} />

								<Route path="/lessons" element={<LessonsList />} />

								<Route path="/groups" element={<GroupList />} />

								<Route path="/groups/:id" element={<GroupPage />} />

							</Routes>

						</div>

					</div>

				</div>

			</BrowserRouter>
		</Provider>


  )
}

export default App
