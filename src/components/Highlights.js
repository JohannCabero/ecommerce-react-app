// Dependencies and Modules
import { Col, Card } from 'react-bootstrap';

export default function Highlights(){

	return (
		<>
			<Col className="my-2 my-md-4" xs={12} md={4}>
				<Card className="highlight">
					<Card.Body>
						<Card.Title as="h4" className="highlight-title">Filipino Made</Card.Title>
						<Card.Text>
							Discover a vibrant collection of products crafted with pride and expertise from the heart of the Philippines and from every corner of the archipelago's thousands of islands. From intricately woven textiles to meticulously made furniture, immerse yourself in the rich cultural heritage and support local enterprises with every purchase.
						</Card.Text>
					</Card.Body>
				</Card>
			</Col>

			<Col className="my-2 my-md-4" xs={12} md={4}>
				<Card className="highlight">
					<Card.Body>
						<Card.Title as="h4" className="highlight-title">Great Deals</Card.Title>
						<Card.Text>
							Dive into an ocean of savings with our price offerings, where you'll find irresistible discounts on a wide range of products. Whether you're hunting for electronics, fashion, or home essentials, seize the opportunity to snag incredible bargains and elevate your shopping experience without breaking the bank.
						</Card.Text>
					</Card.Body>
				</Card>
			</Col>

			<Col className="my-2 my-md-4" xs={12} md={4}>
				<Card className="highlight">
					<Card.Body>
						<Card.Title as="h4" className="highlight-title">Quality Selections</Card.Title>
						<Card.Text>
							Elevate your shopping experience with our curated selection of premium products renowned for their exceptional quality and craftsmanship. From luxurious skincare to elegant homeware, indulge in the finer things in life and enhance your lifestyle with every meticulously chosen item.
						</Card.Text>
					</Card.Body>
				</Card>
			</Col>
		</>
	);
}