import React, { useState, useLayoutEffect } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { Landing } from "./Components/Landing/Landing";
import { Register } from "./Components/Register/Register";
import { Reservation } from "./Components/Reservation/Reservation";
import { Login } from "./Components/Login/Login";
import { Home } from "./Components/Home/Home";
import { Guest } from "./Components/Guest/Guest";
import { Profile } from "./Components/Profile/Profile";
import { ReservationHistory } from "./Components/ReservationHistory/ReservationHistory";
import NavBar from "./Components/NavBar/NavBar";
import { verifyLoginStatus, verifyProfileStatus, userIdGet } from "./Controller/Controller";

export const generateUserId = async () => {
	return await userIdGet().then(result => {
		localStorage.setItem("userId", result.data.userId);
	});
};

export default function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("loginToken") != null);
	// eslint-disable-next-line
	const [isGuest, setIsGuest] = useState(!isLoggedIn);
	const [profileExists, setProfileExists] = useState(localStorage.getItem("profileExists") != null);
	const [guestProfileExists, setGuestProfileExists] = useState(localStorage.getItem("guestProfileExists") != null);

	useLayoutEffect(() => {
		// double check from db
		if (isLoggedIn) {
			const loginServerStatus = async () => {
				const res = await verifyLoginStatus(localStorage.getItem("loginToken"));
				return res.data.isLoggedIn;
			};
			
			loginServerStatus().then((loggedIn) => {
				if (!loggedIn) {
					localStorage.clear();
					setIsLoggedIn(false)
					window.location.replace("/");
				}
			})
		}

		// double check from db
		if (profileExists) {
			const profileServerStatus = async () => {
				const res = await verifyProfileStatus(localStorage.getItem("userId"));
				return res.data.exists;
			}

			profileServerStatus().then((exists) => {
				if (!exists) {
					setProfileExists(false);
				}
			})
		}

		// double check from db
		if (guestProfileExists) {
			const profileServerStatus = async () => {
				const res = await verifyProfileStatus(localStorage.getItem("userId"));
				return res.data.exists;
			}

			profileServerStatus().then((exists) => {
				if (!exists) {
					setGuestProfileExists(false);
				}
			})
		}

		const userId = localStorage.getItem("userId");
		if (userId == null) {
			generateUserId();
		}
		// eslint-disable-next-line
	}, []);

	return (
		<Router>
			<NavBar isLoggedIn={ isLoggedIn } setIsLoggedIn={ setIsLoggedIn } />
			<Routes>
				<Route path="/" element={
					isLoggedIn
						? <Navigate replace to="/home" />
						: <Landing />
				} />
				
				<Route path="/reservation" element={
					(isLoggedIn && profileExists) || (isGuest && guestProfileExists)
						? <Reservation isLoggedIn={isLoggedIn}/>
						: isLoggedIn
							? <Navigate replace to="/profile" />
							: <Navigate replace to="/login" /> } />
				
				<Route path="/register" element={
					isLoggedIn
						? <Navigate replace to="/home" />
						: <Register setIsLoggedIn={ setIsLoggedIn } />
				} />

				<Route path="/login" element={
					isLoggedIn
						? <Navigate replace to="/home" />
						: <Login setIsLoggedIn={ setIsLoggedIn } setProfileExists={setProfileExists} />
				} />

				<Route path="/home" element={
					isLoggedIn && profileExists
						? <Home />
						: isLoggedIn
							? <Navigate replace to="/profile" />
							: <Navigate replace to="/login" /> } />
				
				<Route path="/guest" element={
					isLoggedIn
						? <Navigate replace to="/home" />
						: <Guest setGuestProfileExists={setGuestProfileExists} />
				} />

				<Route path="/profile" element={
					isLoggedIn
						? <Profile guestProfileExists={guestProfileExists} profileExists={profileExists} setProfileExists={setProfileExists} />
						: <Navigate replace to="/login" /> } />
				
				<Route path="/reservationHistory" element={
					isLoggedIn
					? <ReservationHistory/>
					: <Navigate replace to="/login" />
				} />
			</Routes>
		</Router>
	);
}
