// Dependencies and Modules
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export default function NotFound(){

	return (
		<>
			<Container fluid className="text-center py-5">
				<h1 className="text-danger"><strong>404</strong></h1>
				<h3>Page Not Found</h3>
				<hr />
				<Link to="/" className="btn btn-primary mx-auto"><strong>Return Home</strong></Link>
			</Container>	
		</>
	);
}