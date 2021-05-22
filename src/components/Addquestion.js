import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { handleAddQuestion } from '../actions/questions';

class NewQuestion extends Component {
	state = {
		firstOption: '',
		secondOption: '',
		toHome: false
	};

	handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		this.setState({
			[name]: value
		});
	};

	handleSubmit = (e) => {
		const { firstOption, secondOption } = this.state;
		const { dispatch } = this.props;

		e.preventDefault();

		this.setState(
			{
				firstOption: '',
				secondOption: '',
				toHome: true
			},
			() => dispatch(handleAddQuestion(firstOption, secondOption))
		);
	};

	render() {
		const { firstOption, secondOption, toHome } = this.state;

		if (toHome === true) return <Redirect to="/" />;

		return (
			<Fragment>
				<h2 className="text-center my-3">
					<small>Would You Rather...</small>
				</h2>
				<Row className="justify-content-center">
					<Col xs={12} md={6}>
						<Card bg="light" className="m-3 text-center">
							<Card.Body>
								<Form onSubmit={this.handleSubmit}>
									<Form.Group controlId="firstOption">
										<Form.Control
											type="text"
											name="firstOption"
											value={firstOption}
											onChange={this.handleChange}
										/>
									</Form.Group>
									<h3>
										<p>OR</p>
									</h3>
									<Form.Group controlId="secondOption">
										<Form.Control
											type="text"
											name="secondOption"
											value={secondOption}
											onChange={this.handleChange}
										/>
									</Form.Group>
									<Button
										type="submit"
										variant="outline-dark"
										disabled={!firstOption || !secondOption}
									>
										Save
									</Button>
								</Form>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Fragment>
		);
	}
}

export default connect()(NewQuestion);
