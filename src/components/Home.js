import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import QuestionList from './QuestionList';

class Home extends Component {
	render() {
		const { answeredQuestionIds, unansweredQuestionIds } = this.props;

		return (
			<div>
				<Tabs>
					<Tab eventKey="unanswered" title="Unanswered Questions">
						<QuestionList ids={unansweredQuestionIds}
						/>
					</Tab>
					<Tab eventKey="answered" title="Answered Questions">
						<QuestionList ids={answeredQuestionIds}
						/>
					</Tab>
				</Tabs>
			</div>
		);
	}
}

function mapStateToProps({ authedUser, questions, users }) {
	const answeredQuestionIds = Object.keys(questions)
		.filter((id) => users[authedUser].answers.hasOwnProperty(id));

	const unansweredQuestionIds = Object.keys(questions)
		.filter((id) => !users[authedUser].answers.hasOwnProperty(id));

	return {
		answeredQuestionIds,
		unansweredQuestionIds
	};
}

export default connect(mapStateToProps)(Home);
