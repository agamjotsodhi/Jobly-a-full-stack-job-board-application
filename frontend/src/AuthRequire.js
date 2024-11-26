import { useContext } from 'react';
import CurrentUserContext from './CurrentUserContext';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
	const { storedValue } = useContext(CurrentUserContext);

	return storedValue ? children : <Navigate to="/login" replace />;
};

export default RequireAuth;