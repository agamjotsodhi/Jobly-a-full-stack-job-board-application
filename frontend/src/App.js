import './styles/App.css';
import useLocalStorage from './hooks/useLocalStorage';
import { BrowserRouter } from 'react-router-dom';
import JoblyRoutes from './Routes';
import NavBar from './NavBar';
import JoblyApi from './apiHelper';
import { useEffect, useState } from 'react';
import CurrentUserContext from './CurrentUserContext';

function App() {
	// State variables for applications, current user, and token storage
	const [ applications, setApplications ] = useState();
	const [ currentUser, setCurrentUser ] = useState();
	const [ storedValue, setValue ] = useLocalStorage();

	// Effect to fetch user data if a token is stored
	useEffect(
		() => {
			const getUserByUsername = async (username) => {
				JoblyApi.token = storedValue.token;
				let user = await JoblyApi.getUser(username);
				setCurrentUser(user);
				let apps = user.applications;
				setApplications([ ...apps ]);
			};

			storedValue ? getUserByUsername(storedValue.username) : console.log('Logged out');
		},
		[ storedValue ]
	);

	// Function to handle user registration and save token
	const setTokenAfterRegister = async (data, username) => {
		let response = await JoblyApi.registerUser(data);
		if (response.token) {
			setValue({ token: response.token, username: username });
			return true;
		} else {
			return response;
		}
	};

	// Function to handle user login and save token
	const setTokenAfterLogin = async (data, username) => {
		let response = await JoblyApi.loginUser(data);
		if (response.token) {
			setValue({ token: response.token, username: username });
			return true;
		} else {
			return response;
		}
	};

	// Function to log out the current user
	const logOutUser = () => {
		setValue(null);
	};

	// Function to edit user profile information
	const editProfileInfo = async (data) => {
		let response = await JoblyApi.patchUser(storedValue.username, data);
		if (response.user) {
			setValue({ token: storedValue.token, username: response.user.username });
			return true;
		} else {
			return response;
		}
	};

	// Function to handle job applications for the user
	const applyToJob = async (username, jobId) => {
		console.log(username, jobId);
		let response = await JoblyApi.applyToJob(username, jobId);
		return response.applied ? true : false;
	};

	// Main return block 
	return (
		<div className="App">
			<CurrentUserContext.Provider value={{ storedValue, currentUser, applyToJob, applications }}>
				<BrowserRouter>
					<NavBar logOutUser={logOutUser} />
					<main>
						<JoblyRoutes
							setTokenAfterRegister={setTokenAfterRegister}
							setTokenAfterLogin={setTokenAfterLogin}
							editProfileInfo={editProfileInfo}
						/>
					</main>
				</BrowserRouter>
			</CurrentUserContext.Provider>
		</div>
	);
}

export default App;