import './styles/App.css';
import { BrowserRouter } from 'react-router-dom';
import JoblyRoutes from './Routes';
import NavBar from './NavBar';
import JoblyApi from './apiHelper';
import { useEffect, useState } from 'react';
import CurrentUserContext from './CurrentUserContext';

function App() {
//  Use state scenarios 
  const [ applications, setApplications ] = useState();
	const [ currentUser, setCurrentUser ] = useState();
	const [ storedValue, setValue ] = useLocalStorage();  
}

export default App;
