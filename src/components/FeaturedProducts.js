// Dependencies and Modules
import { useState, useEffect } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function FeaturedProducts(){

	const [ previews, setPreviews ] = useState([]);

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_BASE_URL}/products/`)
		.then(res => res.json())
		.then(data => {

			if(typeof data.message !== 'string'){
				const numbers = [];
				const featured = [];

				const generateRandomNums = () => {
					let randomNum = Math.floor(Math.random() * data.products.length);

					if(numbers.indexOf(randomNum) === -1){
						numbers.push(randomNum);
					} else {
						generateRandomNums();
					}
				}

				let productsLength;

				if(data.products.length <= 2){
					productsLength = 1;
				} else if (data.products.length <= 4){
					productsLength = 2;
				} else {
					productsLength = data.products.length - 2;
				}

				for(let i = 0; i < (productsLength); i++){
					generateRandomNums();

					let { _id, name, description, price } = data.products[numbers[i]];

					featured.push(
						<Card className="my-3 bg-primary text-white" key={_id}>
							<Card.Body>
								<Card.Title>{ name }</Card.Title>
								<Card.Subtitle>Description:</Card.Subtitle>
								<Card.Text>{ description }</Card.Text>
								<Card.Subtitle>Price:</Card.Subtitle>
								<Card.Text>&#8369; { price }</Card.Text>
							</Card.Body>
						</Card>
					);
				}

				setPreviews(featured);
			} else {
				setPreviews(0)
			}
			
		});
	}, []);

	return (
		<>
		{(previews.length > 0) ?
			<Row className="mt-5 px-3 px-md-5" id="home-row-3">
				<h2 className="text-center page-headers">Our Featured Products</h2>
				<Col>
					{previews}
				</Col>
				<span id="featured-btn"><Link to="/products" className="pb-5"><Button className="shop-btn"><strong>Shop Now</strong></Button></Link></span>
			</Row>
		:
			<>
			</>
		}
		</>
	);
}