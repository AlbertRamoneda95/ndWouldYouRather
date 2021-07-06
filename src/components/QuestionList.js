import React, { Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from './Image';

class QuestionList extends Component {
	render() {
		const {questions, users} = this.props;
		return (
			<div>
				<h2 className="text-center my-3">
					<small>Would You Rather...</small>
				</h2>
				{questions.length ? (
					questions.map((question) => {
						let {author, id, optionOne, optionTwo,avatarURL, timestamp} = question;
						return(
							<Row className="justify-content-center" key={id}>
								<Col xs={12} md={6}>
									<Card bg="light" className="m-3">
										<Card.Header>
											<Image avatarURL={avatarURL} className="mr-2" />
											{users[author].name} asks:
										</Card.Header>
										<Card.Body className="text-center">
											<Card.Text>{optionOne.text} </Card.Text>
											<Card.Text>or </Card.Text>
											<Card.Text>{optionTwo.text} </Card.Text>
											<Link to={`/questions/${id}`}>
												<Button variant="outline-dark">View Question</Button>
											</Link>
										</Card.Body>
										<Card.Footer>
											<Card.Text>
												{new Date(timestamp).toLocaleString()}
											</Card.Text>
										</Card.Footer>
									</Card>
								</Col>
							</Row>
						)
						
					})
				) : (
					<p className="text-center">No questions to show</p>
				)}
			</div>
		);
	}
}


function mapStateToProps({ questions, users}, {ids}) {
	let res = [];
	
	const filteredQuestions = Object.keys(questions)
	.filter(key => ids.includes(key))
	.sort((a, b) => questions[b].timestamp - questions[a].timestamp)
	.reduce((obj, key) => {
	obj[key] = questions[key];
	return obj;
	}, {});
	const questionsArray = Object.entries(filteredQuestions);
	questionsArray.forEach(([key, value]) => {
		let item = value;
		item["avatarURL"] = users[item.author].avatarURL;
		res.push(value);
	});
	
	return {
		questions: res,
		users
	};
}
export default connect(mapStateToProps)(QuestionList);
