import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from './Image';

class LeaderBoard extends Component {
	render() {
		debugger;
		return (
			<Fragment>
				<h2 className="text-center my-3">
					<small>LeaderBoard</small>
				</h2>
				{this.props.users.map((user) => (
					<div key={user.id}>
						<Row className="justify-content-center">
							<Col xs={12} md={6}>
								<Card className="m-3">
									<Card.Header>
										<Image avatarURL={user.avatarURL} className="mr-2" />
										{user.name}
									</Card.Header>
									<Card.Body className="d-flex justify-content-center">
										<Card.Text>
											Answered Questions: {Object.keys(user.answers).length}
											<br />
											Created Questions: {user.questions.length}
										</Card.Text>
									</Card.Body>
									<Card.Footer>
										Total: {Object.keys(user.answers).length + user.questions.length}
									</Card.Footer>
								</Card>
							</Col>
						</Row>
					</div>
				))}
			</Fragment>
		);
	}
}


function mapStateToProps({ users }) {
	const objectArray = Object.entries(users);
	let usersArr=[]

	objectArray.forEach(([key, value]) => {
		usersArr.push(value);
	});

	usersArr = usersArr.sort((a, b) => {
		return (Object.keys(b.answers).length + b.questions.length) - (Object.keys(a.answers).length + a.questions.length)
	});
	return {
		users: usersArr,
	};
}

export default connect(mapStateToProps)(LeaderBoard);
