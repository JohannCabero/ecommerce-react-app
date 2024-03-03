// Dependencies and Modules
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../UserContext.js';

export default function AppNavbar(){

	const { user } = useContext(UserContext);

	return (
		<Navbar bg="secondary" id="navbar" expand="lg" sticky="top" className="px-3 border-bottom border-black">
			<Container fluid>
				<Navbar.Brand as={Link} to="/" className="text-white"><strong>Shoppitude</strong></Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav"/>
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						<Nav.Link as={NavLink} to="/" exact="true" className="text-white navbar-text">Home</Nav.Link>
						<Nav.Link as={Link} to="/products" exact="true" className="text-white navbar-text">Products</Nav.Link>
						{
							(user.id !== null) ? 
							<>
								{(user.isAdmin) ?
								<>
								</>
								:
								<Nav.Link as={Link} to="/cart" exact="true" className="text-white navbar-text">Cart</Nav.Link>

								}

							 	<Nav.Link as={Link} to="/orders" exact="true" className="text-white navbar-text">Orders</Nav.Link>
							 	<Nav.Link as={Link} to="/users/logout" exact="true" className="text-white navbar-text">Logout</Nav.Link>
							</>
							: 
							<>
								<Nav.Link as={Link} to="/users/register" exact="true" className="text-white navbar-text">Register</Nav.Link>
								<Nav.Link as={Link} to="/users/login" exact="true" className="text-white navbar-text">Login</Nav.Link>
							</>
						}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}