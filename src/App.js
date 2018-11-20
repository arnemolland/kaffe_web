import React, { Component } from "react";
import logo from "./images/kaffe_logo_black.svg";
import "./App.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./views/Home";
import Register from "./components/Auth/Register";

import Footer from "./components/Footer";

class App extends Component {
	render() {
		return (
			<Router>
				<div>
					<Route exact path="/" component={Home} />

					{/* Etc 
					<Route path="/profile" component={Profile} />*/}

					{/* Auth */}
					{/*<Route path="/login" component={Login} />*/}
					<Route path="/register" component={Register} />

					<Footer />
				</div>
			</Router>
		);
	}
}

export default App;
