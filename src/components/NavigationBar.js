import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { reSetAuthedUser } from '../actions/authedUser';

function NavigationBar(props) {
	const { user, dispatch } = props;

	const handleLogout = () => {
		dispatch(reSetAuthedUser());
	};

	return (
		<Fragment>
			<Navbar expand="lg" style={{backgroundColor: "#e3f2fd"}} variant="light" className="my-3 border">
				<Navbar.Brand as={Link} to="/">
					<h2>
						<small>Would You Rather?</small>
					</h2>
				</Navbar.Brand>
				{getNavLinks(user, handleLogout)}
			</Navbar>
		</Fragment>
	);
}

function getNavLinks(user, handleLogout) {
	return <Navbar.Collapse id="basic-navbar-nav">
		<Nav className="mr-auto">
			<Nav.Link as={NavLink} to="/" exact>
				Home
			</Nav.Link>
			<Nav.Link as={NavLink} to="/add">
				New Question
			</Nav.Link>
			<Nav.Link as={NavLink} to="/leaderboard">
				Leaderboard
			</Nav.Link>
		</Nav>
		<Nav className="align-items-start">
			<Navbar.Text>{user.name}</Navbar.Text>
			<Button
				variant="outline-dark"
				onClick={handleLogout}
			>
				Logout
			</Button>
		</Nav>
	</Navbar.Collapse>;
}

function mapStateToProps({ users, authedUser }) {
	return {
		user: users[authedUser]
	};
}

export default connect(mapStateToProps)(NavigationBar);
