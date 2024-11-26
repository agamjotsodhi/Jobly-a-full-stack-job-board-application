import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { useState, useContext } from 'react';
import './styles/JobCard.css';
import CurrentUserContext from './CurrentUserContext';
import ApplyButton from './ApplyButton';

const JobCard = ({ job }) => {
	const { currentUser, applyToJob } = useContext(CurrentUserContext);
	const [ response, setResponse ] = useState(false);
	const apply = async () => {
		let success = await applyToJob(currentUser.username, job.id);
		success === true ? setResponse(true) : setResponse(success);
	};
	return (
		<div className="jobCard">
			<Card body className="my-2">
				<CardBody>
					<CardTitle tag="h5">{job.title}</CardTitle>
					{job.companyName && <CardText>{job.companyName}</CardText>}
					<CardText>Salary:{job.salary}</CardText>
					<CardText>Equity:{job.equity === null ? 'None' : job.equity}</CardText>
					{response === true || currentUser?.applications?.includes(job.id) ? (
						<ApplyButton success={true} />
					) : (
						<ApplyButton success={false} apply={apply} />
					)}
				</CardBody>
			</Card>
		</div>
	);
};

export default JobCard;