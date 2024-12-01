import { useContext } from 'react';
import CurrentUserContext from './CurrentUserContext';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
	// Access the current user's stored value from context
	const { storedValue } = useContext(CurrentUserContext);

	// If user is authenticated, render the children components; otherwise, redirect to login page
	return storedValue ? children : <Navigate to="/login" replace />;
};

export default RequireAuth;