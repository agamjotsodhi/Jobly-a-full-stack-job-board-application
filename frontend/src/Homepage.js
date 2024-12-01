import './styles/Homepage.css';
import { useContext } from 'react';
import CurrentUserContext from './CurrentUserContext';
import { Container, Row, Col, Button } from 'reactstrap';
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
		<Container className="HomePageContainer">
			<Row>
				<Col md="6" className="HomeTextSection">
					{storedValue && currentUser ? (
						<div>
							<h1>Welcome, {currentUser.firstName}</h1>
							<p>Start your job search today</p>
							<Button className="Start" onClick={goToJobs}>
								Look for a job
							</Button>
						</div>
					) : (
						<div>
							<h1>All the jobs, in one convenient place</h1>
							<Button className="Start" onClick={goToSignup}>
								Join today
							</Button>
						</div>
					)}
				</Col>
				{/* Homepage image graphic on right side */}
				<Col md="6" className="HomeImageSection">
					<img className="HomeImage" alt="Graphic of job workers" />
				</Col>
			</Row>
		</Container>
	);
};

export default Home;
