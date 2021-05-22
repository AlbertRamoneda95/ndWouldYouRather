import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
	return (
		<div className="text-center min-vh-100">
			<h1 className="text-center">404 Page Not Found</h1>
			<h1 className="text-center">
				<Link to="/">Return Home</Link>
			</h1>
		</div>
	);
}

export default NotFound;
