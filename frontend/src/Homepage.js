import './styles/Homepage.css';
import { useContext } from 'react';
import CurrentUserContext from './CurrentUserContext';
import { Container, Col, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const Home = () => {
	const navigate = useNavigate();
	const { storedValue, currentUser } = useContext(CurrentUserContext);
	const goToJobs = () => {
		navigate('/jobs');
	};
	const goToSignup = () => {
		navigate('/signup');
	};
	return (
		<Container>
			<Col
				md={{
					offset: 3,
					size: 6
				}}
				sm="12"
			>
				<div className="HomeGreeting">
					{storedValue && currentUser ? (
						<h1>Welcome, {currentUser.firstName}</h1>
					) : (
						<img className="Logo" alt="Logo" />
					)}
					{storedValue && currentUser ? (
						<div>
							<p>Start your job search today</p>
							<Button className="Start" onClick={goToJobs}>
								Look for a job
							</Button>
						</div>
					) : (
						<div>
							<p>All the jobs, in one convenient place</p>
							<Button className="Start" onClick={goToSignup}>
								Signup
							</Button>
						</div>
					)}
				</div>
			</Col>
		</Container>
	);
};

export default Home;