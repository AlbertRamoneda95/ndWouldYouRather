import React from 'react';
import Image from 'react-bootstrap/Image';

function Img(props) {
	return (
		<Image
			src={props.avatarURL}
			roundedCircle
			width="30"
			height="30"
			className={props.className}
		/>
	);
}

export default Img;
