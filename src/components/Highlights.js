// Dependencies and Modules
import { Col, Card } from 'react-bootstrap';

export default function Highlights(){

	return (
		<>
			<Col className="my-2 my-md-4" xs={12} md={4}>
				<Card className="highlight">
					<Card.Body>
						<Card.Title>Great Deals</Card.Title>
						<Card.Text>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
						</Card.Text>
					</Card.Body>
				</Card>
			</Col>

			<Col className="my-2 my-md-4" xs={12} md={4}>
				<Card className="highlight">
					<Card.Body>
						<Card.Title>Great Deals</Card.Title>
						<Card.Text>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
						</Card.Text>
					</Card.Body>
				</Card>
			</Col>

			<Col className="my-2 my-md-4" xs={12} md={4}>
				<Card className="highlight">
					<Card.Body>
						<Card.Title>Great Deals</Card.Title>
						<Card.Text>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
						</Card.Text>
					</Card.Body>
				</Card>
			</Col>
		</>
	);
}