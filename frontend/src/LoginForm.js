import { Input, Button, Form, FormGroup, Col, Container } from 'reactstrap';
import { useForm, Controller } from 'react-hook-form';
import './styles/LoginForm.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Alert from './Alert.js';

const LoginForm = ({ setTokenAfterLogin }) => {
	const navigate = useNavigate();
	const [ response, setResponse ] = useState(false);
	const { control, handleSubmit, reset } = useForm({
		defaultValues: {
			username: 'TestUser123',
			password: 'HelloWorld'
		}
	});

	const onSubmit = async (data) => {
		const success = await setTokenAfterLogin(data, data.username);
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
							<h1>Login</h1>
							<div className="Username">
								<Controller
									name="username"
									control={control}
									render={({ field }) => <Input placeholder="Username" {...field} />}
								/>
							</div>
							<div className="Password">
								<Controller
									name="password"
									control={control}
									render={({ field }) => <Input type="password" placeholder="Password" {...field} />}
								/>
							</div>
							{response !== false ? <Alert type="danger" message={response} /> : null}
							<Button className="FormButton" type="submit" size="lg">
								Submit
							</Button>
						</div>
					</Col>
				</FormGroup>
			</Form>
		</Container>
	);
};

export default LoginForm;