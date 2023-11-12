import './Styles/Main.sass'
import './Styles/Reset.sass'
import './Styles/Fonts.sass'
import {BrowserRouter, Route, Routes, Navigate, Outlet, useLocation } from 'react-router-dom';
import Header from "./Components/Header/Header";
import Breadcrumbs from "./Components/Breadcrumbs/Breadcrumbs";
import GroupPage from "./Pages/GroupPage/GroupPage";
import SignIn from "./Pages/LoginPage/SignIn/SignIn";
import SignUp from "./Pages/LoginPage/SignUp/SignUp";
import {Provider} from "react-redux"
import store from "./store/store"
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import LessonConstructor from "./Components/LessonConstructor/LessonConstructor";
import {useAuth} from "./hooks/useAuth";
import LessonPage from "./Pages/LessonPage/LessonPage";
import HomePage from "./Pages/HomePage/HomePage";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import LessonsListPage from "./Pages/LessonsListPage/LessonsListPage";
import GroupListPage from "./Pages/GroupListPage/GroupListPage";
import {QueryClient, QueryClientProvider } from "react-query";

const LoginFormLayout = () => {
	return (
		<div className="login-wrapper">
			<Outlet />
		</div>
	)
}

const TopPanelWrapper = () => {
	const {is_authenticated} = useAuth()
	const location = useLocation()

	return (
		<div className="top-panels-wrapper">
			<Breadcrumbs />
			{is_authenticated && location.pathname.includes("groups") && <LessonConstructor /> }
		</div>
	)
}


function App() {

	const queryClient = new QueryClient()

	return (
		<QueryClientProvider client={queryClient}>

			<Provider store={store}>

				<BrowserRouter basename="/university">

					<div className="App">

						<div className="wrapper">

							<ToastContainer />

							<Header />

							<div className="content-wrapper">

								<TopPanelWrapper />

								<Routes>

									<Route path="/home" element={<HomePage />} />

									<Route path="/" element={<Navigate to="/home" replace />} />


									<Route path="/auth/" element={<LoginFormLayout />} >

										<Route path="" element={<Navigate to="login/" replace />} />

										<Route path="login/" element={<SignIn />} />

										<Route path="register/" element={<SignUp />} />

									</Route>


									<Route path="/profile" element={<ProfilePage />} />

									<Route path="/lessons" element={<LessonsListPage />} />

									<Route path="/lessons/draft" element={<LessonPage />} />

									<Route path="/groups" element={<GroupListPage />} />

									<Route path="/groups/:id" element={<GroupPage />} />

								</Routes>

							</div>

						</div>

					</div>

				</BrowserRouter>
			</Provider>

		</QueryClientProvider>
  )
}

export default App
