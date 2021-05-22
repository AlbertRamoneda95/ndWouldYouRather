import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import Login from './components/Login';
import Main from './components/Main';
import { handleInitialData } from './actions/initialData';

class App extends Component {
	componentDidMount() {
		this.props.dispatch(handleInitialData());
	}

	render() {
		const { authedUser, loadingBar } = this.props;

		if (loadingBar.default === undefined || loadingBar.default === 1) {
			return (
				getSpinner()
			);
		} else {
			return <div>{!authedUser ? <Login /> : <Main />}</div>;
		}
	}
}

function getSpinner() {
	return <div className="d-flex justify-content-center">
		<Spinner
			animation="border"
			className="my-5"
		>
			<span className="sr-only">Loading...</span>
		</Spinner>
	</div>;
}

function mapStateToProps({ authedUser, loadingBar }) {
	return {
		authedUser,
		loadingBar
	};
}

export default connect(mapStateToProps)(App);
