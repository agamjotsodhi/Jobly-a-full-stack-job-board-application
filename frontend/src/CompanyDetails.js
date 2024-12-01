import JobCard from './JobCard.js';
import { useParams } from 'react-router-dom';
import JoblyApi from './apiHelper.js';
import { useState, useEffect } from 'react';
import './styles/CompanyDetail.css';


const CompanyDetail = () => {
	// Get the company handle from the URL
	const { handle } = useParams();

	// States to store company information and associated jobs
	const [ company, setCompany ] = useState({});
	const [ jobs, setJobs ] = useState([]);

	// Fetch company details and jobs when the component loads
	useEffect(() => {
		async function getCompany(handle) {
			let company = await JoblyApi.getCompany(handle);
			setCompany(company);
			setJobs(company.jobs.map((job) => job));
		}
		getCompany(handle);
	}, [handle]);

	return (
		<section className="Detail">
			<div className="Details">
				<h3>{company.name}</h3>
				<p>{company.description}</p>
			</div>
			{jobs.map((job) => <JobCard job={job} key={job.id} />)}
		</section>
	);
};

export default CompanyDetail;