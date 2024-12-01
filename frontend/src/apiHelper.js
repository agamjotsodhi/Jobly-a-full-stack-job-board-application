import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

/** API Class.
 *
 * Static class tying together methods used to get/send to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
	// the token for interactive with the API will be stored here.
	static token;

	static async request(endpoint, data = {}, method = 'get') {
		console.debug('API Call:', endpoint, data, method);

		//there are multiple ways to pass an authorization token, this is how you pass it in the header.
		//this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
		const url = `${BASE_URL}/${endpoint}`;
		const headers = { Authorization: `Bearer ${JoblyApi.token}` };
		const params = method === 'get' ? data : {};

		try {
			return (await axios({ url, method, data, params, headers })).data;
		} catch (err) {
			console.error('API Error:', err.response);
			let message = err.response.data.error.message;
			// throw Array.isArray(message) ? message : [ message ];
			return message;
		}
	}

	//  API routes

	/** Fetch details for a specific company using its handle. */
	static async getCompany(handle) {
		let response = await this.request(`companies/${handle}`);
		return response.company;
	}

	/** Fetch all companies, optionally filter by name. */
	static async getAllCompanies(name) {
		let response;
		name
			? (response = await this.request(`companies?name=${name}`))
			: (response = await this.request(`companies/`));
		return response.companies;
	}

	/** Fetch all jobs, optionally filter by title. */
	static async getAllJobs(title) {
		let response;
		title ? (response = await this.request(`jobs?title=${title}`)) : (response = await this.request(`jobs/`));
		return response.jobs;
	}

	/** Register a new user and return a token. */
	static async registerUser(registerInfo) {
		let response = await this.request('auth/register', registerInfo, 'post');
		JoblyApi.token = response.token;
		return response;
	}

	/** Log in an existing user and return a token. */
	static async loginUser(loginInfo) {
		let response = await this.request('auth/token', loginInfo, 'post');
		JoblyApi.token = response.token;
		return response;
	}

	/** Fetch details for a specific user by username. */
	static async getUser(username) {
		let response = await this.request(`users/${username}`);
		return response.user;
	}

	/** Update a user's profile information. */
	static async patchUser(username, newUserInfo) {
		let response = await this.request(`users/${username}`, newUserInfo, 'patch');
		return response;
	}

	/** Submit a job application for a user. */
	static async applyToJob(username, jobId) {
		let response = await this.request(`users/${username}/jobs/${jobId}`, undefined, 'post');
		return response;
	}
}

export default JoblyApi;