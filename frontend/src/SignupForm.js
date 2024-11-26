import { Input, Button, Form, FormGroup, Col, Container } from 'reactstrap';
import { useForm, Controller } from 'react-hook-form';
import './styles/SignupForm.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Alert from './Alert';

const SignupForm = ({ setTokenAfterRegister }) => {
	const navigate = useNavigate();
	const [ response, setResponse ] = useState(false);
	const { control, handleSubmit, reset } = useForm({
		defaultValues: {
			username: '',
			password: '',
			firstName: '',
			lastName: '',
			email: ''
		}
	});

	const onSubmit = async (data) => {
		let success = await setTokenAfterRegister(data, data.username);
		if (success === true) {
			navigate('/');
		} else {
			setResponse(success);
			reset();
		}
	};
	return (
		<Container>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<FormGroup row>
					<Col
						md={{
							offset: 3,
							size: 6
						}}
						sm="12"
					>
						<div className="FormContainer">
							<h1>Signup</h1>
							<div className="Username">
								<Controller
									name="username"
									control={control}
									render={({ field }) => <Input placeholder="Username" {...field} />}
								/>
							</div>
							<div className="Firstname">
								<Controller
									name="firstName"
									control={control}
									render={({ field }) => <Input placeholder="Firstname" {...field} />}
								/>
							</div>
							<div className="Lastname">
								<Controller
									name="lastName"
									control={control}
									render={({ field }) => <Input placeholder="Lastname" {...field} />}
								/>
							</div>
							<div className="Password">
								<Controller
									name="password"
									control={control}
									render={({ field }) => <Input type="password" placeholder="Password" {...field} />}
								/>
							</div>
							<div className="Email">
								<Controller
									name="email"
									control={control}
									render={({ field }) => <Input type="email" placeholder="Email" {...field} />}
								/>
							</div>
							{response !== false ? <Alert type="danger" message={response[0]} /> : null}
							<Button className="SignupButton" type="submit" size="lg">
								Submit
							</Button>
						</div>
					</Col>
				</FormGroup>
			</Form>
		</Container>
	);
};

export default SignupForm;