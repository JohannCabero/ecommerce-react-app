// Dependencies and Modules
import { Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Highlights from '../components/Highlights.js';
import FeaturedProducts from '../components/FeaturedProducts.js';
import homeImage from "../images/Shoppitude-Logo.png";

export default function Home(){

	return (
		<>
			<Row className="d-md-none">
				<Col className='mt-4 pt-3 text-center'>
					<img src={homeImage} className="img-fluid home-banner" />
				</Col>
			</Row>
			<Row className="py-4 py-md-5 ps-md-5 px-2" id="home-row-1">
				<Col className='mt-md-5 p-3'>
					<h1 className="title-bold">Shoppitude</h1>
					<p>
						The leading Filipino-made shopping app established in 2024. <br/>Click through to see more deals made especially for you!
					</p>
					<Link to="/products"><Button className="shop-btn mt-3"><strong>Shop Now</strong></Button></Link>
				</Col>
				<Col className='mt-4 p-3 text-center d-none d-md-block'>
					<img src={homeImage} className="img-fluid home-banner" />
				</Col>
			</Row>
			<Row className="bg-primary py-4 px-3" id="home-row-2">
				<Highlights />
			</Row>
			<FeaturedProducts />
		</>
	);
}