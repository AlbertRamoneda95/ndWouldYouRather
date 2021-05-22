import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Card, Form, Row, Col, Button} from 'react-bootstrap';
import { handleAddAnswer } from '../actions/questions';
import { NavLink } from 'react-router-dom';
import Img from './Image';

class UnansweredQuestion extends Component {
	handleSubmit = (id, e) => {
		const answer = this.form.answer.value;
		const { dispatch } = this.props;

		e.preventDefault();

		if (answer !== '') {
			dispatch(handleAddAnswer(id, answer));
		}
	};

	render() {
		const { question, author } = this.props;
		const { optionOne, optionTwo, id } = question;
		const { name, avatarURL } = author;

		return (
			<Row className="justify-content-center">
				<Col xs={12} md={6}>
					<Card bg="light" className="m-3">
						<Card.Header>
							<Img avatarURL={avatarURL} className="mr-2" />
							{name} asks:
						</Card.Header>

						<Card.Body className="d-flex justify-content-center">
							<Form
								onSubmit={(e) => this.handleSubmit(id, e)}
								ref={(f) => (this.form = f)}
							>
								{this.form && this.form.answer.value ? (
									<p className="text-danger">Please select a choice </p>
								) : null}
								<Form.Check
									custom
									type="radio"
									id="optionOne"
									label={optionOne.text}
									value="optionOne"
									name="answer"
									className="mb-2"
								/>
								<Form.Check
									custom
									type="radio"
									id="optionTwo"
									label={optionTwo.text}
									value="optionTwo"
									name="answer"
									className="mb-2"
								/>
								<Button type="submit">
									Vote
								</Button>
							</Form>
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

function mapStateToProps({ questions, users }, { id }) {
	const question = questions[id];

	return {
		question:question,
		author: question ? users[question.author] : null
	};
}

export default connect(mapStateToProps)(UnansweredQuestion);
