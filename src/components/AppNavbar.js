// Dependencies and Modules
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../UserContext.js';

export default function AppNavbar(){

	const { user } = useContext(UserContext);

	return (
		<Navbar bg="secondary" id="navbar" expand="lg" sticky="top" className="px-3">
			<Container fluid>
				<Navbar.Brand as={Link} to="/" className="text-white">E-Commerce App</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav"/>
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						<Nav.Link as={NavLink} to="/" exact="true" className="text-white">Home</Nav.Link>
						{
							(user.id !== null) ? 
							<>
								<Nav.Link as={Link} to="/products" className="text-white">Products</Nav.Link>

								{(user.isAdmin) ?
								<>
								</>
								:
								<Nav.Link as={Link} to="/cart" className="text-white">Cart</Nav.Link>

								}

							 	<Nav.Link as={Link} to="/orders" className="text-white">Orders</Nav.Link>
							 	<Nav.Link as={Link} to="/users/logout" className="text-white">Logout</Nav.Link>
							</>
							: 
							<>
								<Nav.Link as={Link} to="/users/register" exact="true" className="text-white">Register</Nav.Link>
								<Nav.Link as={Link} to="/users/login" exact="true" className="text-white">Login</Nav.Link>
							</>
						}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}