import React, { Component} from 'react';
import { connect } from 'react-redux';
import UnansweredQuestion from './UnansweredQuestion';
import AnsweredQuestion from './AnsweredQuestion';

class Questions extends Component {
	render() {
		const { autherUserAnswerList, match } = this.props;
		const id = match.params.id;
		const isAwnsered = autherUserAnswerList.hasOwnProperty(id) ? true : false;

		return (
			<div>
				<h2 className="text-center my-3">
					<small>Would You Rather...</small>
				</h2>
				{isAwnsered ? <AnsweredQuestion id={id} /> : <UnansweredQuestion id={id} />}
			</div>
		);
	}
}

function mapStateToProps({ authedUser, users }) {
	const autherUserAnswerList = users[authedUser].answers;

	return {
		autherUserAnswerList
	};
}

export default connect(mapStateToProps)(Questions);
