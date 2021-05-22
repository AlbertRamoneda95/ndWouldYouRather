import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Card, Row, Col, Button} from 'react-bootstrap';
import Img from './Image';
import { NavLink } from 'react-router-dom';
class AnsweredQuestion extends Component {
	render() {
		const { question, author, authedUser } = this.props;
		const { optionOne, optionTwo } = question;
		const { name, avatarURL } = author;
		const totalVotes = optionOne.votes.length + optionTwo.votes.length;
		debugger;
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
									chosen by {optionOne.votes.length} of {totalVotes}{' '} users ({( optionOne.votes.length/totalVotes) *100} % votes)
									{optionOne.votes.includes(authedUser) ? (
										<span className="text-success">
											&lt;-- Your choice
										</span>
									) : null}
								</Card.Text>
								<Card.Text className="text-muted">
									chosen by {optionTwo.votes.length} of {totalVotes}{' '} users ({( optionTwo.votes.length/totalVotes) *100} % votes)
									{optionTwo.votes.includes(authedUser) ? (
										<span className="text-success">
											&lt;-- Your choice
										</span>
									) : null}
								</Card.Text>
							</ul>
						</Card.Body>
					</Card>
					<Card>
						<Button as={NavLink} to="/" exact variant="outline-dark"> Go Back</Button>
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
		authedUser: authedUser
	};
}

export default connect(mapStateToProps)(AnsweredQuestion);
