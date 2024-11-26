import { NavLink } from 'react-router-dom';
import { Navbar, Nav, NavItem, Collapse, NavbarToggler } from 'reactstrap';
import './styles/NavBar.css';
import { useContext } from 'react';
import CurrentUserContext from './CurrentUserContext';
import { useState } from 'react';

const NavBar = ({ logOutUser }) => {
	const { storedValue, currentUser } = useContext(CurrentUserContext);
	const [ collapsed, setCollapsed ] = useState(true);

	const toggleNavbar = () => setCollapsed(!collapsed);

	return (
		<div className="nav-div">
			<Navbar expand="md">
				<NavLink to="/" className="navbar-brand">
					<img className="NavLogo" alt="" />
				</NavLink>
				<NavbarToggler onClick={toggleNavbar} className="me-2" />
				{storedValue && currentUser ? (
					<Collapse isOpen={!collapsed} navbar>
						<Nav className="ml-auto" navbar>
							<NavItem>
								<NavLink to="/companies">
									<span className="material-symbols-outlined">apartment</span>Companies
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink to="/jobs">
									<span className="material-symbols-outlined">work</span>Jobs
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink to="/profile">
									<span className="material-symbols-outlined">person</span>Profile
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink className="Logout" to="/" onClick={logOutUser}>
									<span className="material-symbols-outlined">logout</span>Logout{' '}
									{currentUser.username}
								</NavLink>
							</NavItem>
						</Nav>
					</Collapse>
				) : (
					<Collapse isOpen={!collapsed} navbar>
						<Nav className="ml-auto" navbar>
							<NavItem>
								<NavLink to="/login">
									<span className="material-symbols-outlined">login</span>Login
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink to="/signup">
									<span className="material-symbols-outlined">app_registration</span>Signup
								</NavLink>
							</NavItem>
						</Nav>
					</Collapse>
				)}
			</Navbar>
		</div>
	);
};

export default NavBar;