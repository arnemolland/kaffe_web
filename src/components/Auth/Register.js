import React, { Component } from "react";
import {
	Card,
	CardHeader,
	CardContent,
	TextField,
	Input,
	Button,
	Typography
} from "@material-ui/core";
import firebase from "../../firebase";

class Register extends Component {
	state = {
		firstname: "",
		lastname: "",
		email: "",
		password: "",
		passwordConfirmation: "",
		errors: [],
		loading: false,
		usersRef: firebase.database().ref("users")
	};

	isFormValid = () => {
		let errors = [];
		let error;

		if (this.isFormEmpty(this.state)) {
			error = { message: "Fill in all fields" };
			this.setState({ errors: errors.concat(error) });
			return false;
		} else if (!this.isPasswordValid(this.state)) {
			error = { message: "Password is invalid" };
			this.setState({ errors: errors.concat(error) });
			return false;
		} else {
			return true;
		}
	};

	isFormEmpty = ({
		firstname,
		lastname,
		email,
		password,
		passwordConfirmation
	}) => {
		return (
			!firstname.length ||
			!lastname.length ||
			!email.length ||
			!password.length ||
			!passwordConfirmation.length
		);
	};

	isPasswordValid = ({ password, passwordConfirmation }) => {
		if (password.length < 6 || passwordConfirmation.length < 6) {
			return false;
		} else if (password !== passwordConfirmation) {
			return false;
		} else {
			return true;
		}
	};

	displayErrors = errors =>
		errors.map((error, i) => <p key={i}>{error.message}</p>);

	handleChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	handleSubmit = event => {
		event.preventDefault();
		if (this.isFormValid()) {
			this.setState({ errors: [], loading: true });
			firebase
				.auth()
				.createUserWithEmailAndPassword(this.state.email, this.state.password)
				.then(createdUser => {
					console.log(createdUser);
					createdUser.user
						.updateProfile({
							displayName: this.state.username
						})
						.then(() => {
							this.saveUser(createdUser).then(() => {
								console.log("User saved");
							});
						})
						.catch(err => {
							console.error(err);
							this.setState({
								errors: this.state.errors.concat(err),
								loading: false
							});
						});
					// this.setState({ loading: false });
				})
				.catch(err => {
					console.error(err);
					this.setState({
						errors: this.state.errors.concat(err),
						loading: false
					});
				});
		}
	};

	saveUser = createdUser => {
		return this.state.usersRef.child(createdUser.user.uid).set({
			name: createdUser.user.displayName,
			avatar: createdUser.user.photoURL
		});
	};

	handleInputError = (errors, inputName) => {
		return errors.some(error => error.message.toLowerCase().includes(inputName))
			? "errors"
			: "";
	};

	render() {
		const {
			firstname,
			lastname,
			email,
			password,
			passwordConfirmation,
			errors,
			loading
		} = this.state;

		return (
			<div display="flex" flexWrap="wrap">
				<Card>
					<CardHeader title="Register for kaffe.io" />
					<CardContent>
						<form onSubmit={this.handleSubmit}>
							<TextField
								label="Firstname"
								variant="outlined"
								name="firstname"
								value={firstname}
								type="text"
								onChange={this.handleChange}
							/>
							<TextField
								label="Lastname"
								variant="outlined"
								name="lastname"
								value={lastname}
								type="text"
								onChange={this.handleChange}
							/>
							<TextField
								label="Email"
								variant="outlined"
								name="email"
								value={email}
								type="email"
								onChange={this.handleChange}
							/>
							<TextField
								label="Password"
								variant="outlined"
								name="password"
								value={password}
								type="password"
								onChange={this.handleChange}
							/>
							<TextField
								label="Confirm password"
								variant="outlined"
								name="passwordConfirmation"
								value={passwordConfirmation}
								type="password"
								onChange={this.handleChange}
							/>
							<Button
								variant="contained"
								color="primary"
								disabled={loading}
								className={loading ? "loading" : ""}>
								Create user
							</Button>
						</form>
					</CardContent>
				</Card>
			</div>
		);
	}
}

export default Register;
