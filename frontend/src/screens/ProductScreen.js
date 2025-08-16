import React, {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import {Row, Col, Image, ListGroup, Button, Card} from 'react-bootstrap'
import Rating from '../components/Raiting'
import axios from "axios"

/**
 * ProductScreen component displays detailed information about a single product.
 * It fetches product data from the backend API based on the product ID from the URL.
 *
 * @component
 * @returns {JSX.Element} The rendered ProductScreen component.
 */
function ProductScreen() {
    // Extract the product ID from the URL parameters
    const {id} = useParams()

    // State to store the product details
    const [product, setProducts] = useState([])

    useEffect(() => {
        /**
         * Fetches the product details from the backend API.
         * This function is called when the component mounts.
         */
        async function fetchProduct() {
            const {data} = await axios.get(`/api/products/${id}`) // API call to fetch product details
            setProducts(data) // Update the state with the fetched product data
        }

        fetchProduct() // Call the fetchProduct function

        // Optional cleanup function can be returned here if needed
    }, []); // Dependency array ensures this effect runs only once on mount

    return (
        <div>
            {/* Link to navigate back to the homepage */}
            <Link to='/' className='btn btn-light my-3'>Go Back</Link>
            <Row>
                <Col md={6}>
                    {/* Display the product image */}
                    <Image src={product.image} alt={product.name} fluid/>
                </Col>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            {/* Display the product name */}
                            <h3>{product.name}</h3>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            {/* Display the product rating and number of reviews */}
                            <Rating value={product.rating} text={`${product.rating} reviews`} color={'#f8e825'}/>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            {/* Display the product price */}
                            Price: ${product.price}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            {/* Display the product description */}
                            Description: {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={3}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>
                                        {/* Display the product price */}
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>
                                        {/* Display the stock status of the product */}
                                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item className="d-grid gap-2">
                                {/* Button to add the product to the cart */}
                                <Button className='btn-block' disabled={product.countInStock === 0} type={'button'} onClick={() => {
                                }}>Add to Cart</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default ProductScreen