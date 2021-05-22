import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Card, Row, Col} from 'react-bootstrap';
import Img from './Image';

class AnsweredQuestion extends Component {
	render() {
		const { question, author } = this.props;
		const { optionOne, optionTwo } = question;
		const { name, avatarURL } = author;
		const totalVotes = optionOne.votes.length + optionTwo.votes.length;

		return (
			<Row className="justify-content-center">
				<Col xs={12} md={6}>
					<Card className="m-3">
						<Card.Header>
							<Img avatarURL={avatarURL} className="mr-2" />
							{name} asked:
						</Card.Header>

						<Card.Body className="d-flex justify-content-center">
							<ul>
								<Card.Text className="text-muted">
									chosen by {optionOne.votes.length} of {totalVotes}{' '}
									users
								</Card.Text>
								<Card.Text className="text-muted">
									chosen by {optionTwo.votes.length} of {totalVotes}{' '} users
								</Card.Text>
							</ul>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		);
	}
}

function mapStateToProps({ questions, users, authedUser }, { id }) {
	const questionItem = questions[id];

	return {
		question: questionItem,
		author: questionItem ? users[questionItem.author] : null,
		authedUser
	};
}

export default connect(mapStateToProps)(AnsweredQuestion);
