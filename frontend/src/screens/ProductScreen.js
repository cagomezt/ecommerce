import React, {useState, useEffect} from 'react'
import {Link, useParams, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import {Row, Col, Image, ListGroup, Button, Card, Form} from 'react-bootstrap'
import Rating from '../components/Raiting'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {listProductsDetails} from '../actions/productActions' // Action to fetch product details


/**
 * ProductScreen component displays detailed information about a single product.
 * It fetches product data from the backend API based on the product ID from the URL.
 *
 * @component
 * @returns {JSX.Element} The rendered ProductScreen component.
 */
function ProductScreen({history}) {
    const [qty, setQty] = useState(1); // State to manage the quantity of the product to add to the cart
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();
    const productDetails = useSelector(state => state.productDetails); // Access the product details from the Redux store
    const {loading, error, product} = productDetails; // Destructure loading, error, product

    useEffect(() => {
        dispatch(listProductsDetails(id))
        // Optional cleanup function can be returned here if needed
    }, [dispatch, id]); // Dependency array ensures this effect runs only once on mount

    const addToCartHandler = () => {
        navigate(`/cart/${id}?qty=${qty}`) // Navigate to the cart page with the selected product ID and quantity
    }
    return (
        <div>
            {/* Link to navigate back to the homepage */}
            <Link to='/' className='btn btn-light my-3'>Go Back</Link>
            {loading ?
                <Loader/>
                : error
                    ? <Message variant='danger'>{error}</Message>
                    : product ? (<Row>
                        <Col md={6}>
                            <Image src={product.image} alt={product.name} fluid rounded/>
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

                                    {product.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Qty</Col>
                                                <Col xs='auto' className='my-1'>
                                                    {/* Dropdown to select the quantity of the product */}
                                                    <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                                                        {[...Array(product.countInStock).keys()].map((x) => (
                                                            <option key={x + 1} value={x + 1}>
                                                                {x + 1}
                                                            </option>
                                                        ))}
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>)}

                                    <ListGroup.Item className="d-grid gap-2">
                                        {/* Button to add the product to the cart */}
                                        <Button
                                            className='btn-block'
                                            disabled={product.countInStock === 0}
                                            type={'button'}
                                            onClick={addToCartHandler}>Add to Cart</Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>) : null
            }

        </div>
    )
}

export default ProductScreen