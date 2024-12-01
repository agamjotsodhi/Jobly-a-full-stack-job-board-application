import { useState, useEffect } from 'react';
import JoblyApi from './apiHelper.js';
import JobCard from './JobCard.js';
import SearchForm from './SearchForm';
import { Button } from 'reactstrap';

const JobsList = () => {
	const [ jobs, setJobs ] = useState([]);
	const [ searchTerm, setSearchTerm ] = useState('');
	const [ noJobsFound, setNoJobsFound ] = useState(false);

	useEffect(
		() => {
			async function getAllJobs(title) {
				let jobs = await JoblyApi.getAllJobs(title);
				jobs.length !== 0 ? setJobs(jobs) : setNoJobsFound(true);
			}
			getAllJobs(searchTerm);
		},
		[ searchTerm ]
	);

	const getSearchTerm = (data) => {
		setSearchTerm(data.searchTerm);
	};

	const resetSearch = () => {
		setSearchTerm('');
		setNoJobsFound(false);
	};

	return (
		<section>
			<div>
				<SearchForm getSearchTerm={getSearchTerm} />
				{searchTerm && <Button onClick={resetSearch}>Reset Search</Button>}
				{noJobsFound && <h2>Sorry, there are no jobs that match.</h2>}
				{jobs.map((job) => <JobCard job={job} key={job.id} />)}
			</div>
		</section>
	);
};

export default JobsList;