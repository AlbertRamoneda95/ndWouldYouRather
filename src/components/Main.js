import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import NavigationBar from './NavigationBar';
import Home from './Home';
import AddQuestion from './Addquestion';
import Questions from './Questions';
import LeaderBoard from './LeaderBoard';
import NotFound from './NotFound';

class Main extends Component {
	render() {
		return (
			<Router>
				<Container>
					<NavigationBar />
					{getAppRoutes()}
				</Container>
			</Router>
		);
	}
}

export default Main;
function getAppRoutes() {
	return <main>
		<Switch>
			<Route path="/" exact component={Home} />
			<Route path="/questions/:id" component={Questions} />
			<Route path="/add" component={AddQuestion} />
			<Route path="/leaderboard" component={LeaderBoard} />
			<Route component={NotFound} />
		</Switch>
	</main>;
}

