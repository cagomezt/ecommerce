import React, {useState, useEffect} from 'react'
import {Row, Col} from 'react-bootstrap'
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {useDispatch, useSelector} from 'react-redux'
import {listProducts} from '../actions/productActions'


/**
 * HomeScreen component displays the homepage with a list of the latest products.
 * It fetches product data from the backend API and renders it in a responsive grid layout.
 *
 * @component
 * @returns {JSX.Element} The rendered HomeScreen component.
 */
function HomeScreen() {
    // State to store the list of products
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList) // Access the product list from the Redux store
    const {loading, error, products} = productList // Destructure loading, error,

    useEffect(() => {
        dispatch(listProducts())

        // Optional cleanup function can be returned here if needed
    }, [dispatch]); // Dependency array ensures this effect runs only once on mount

    return (
        <div>
            <h1>Latest Products </h1>
            {loading ? <Loader />
                : error
                    ? <Message variant='danger'>{error}</Message>
                    : <Row>
                        {products.map((product) => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product}/> {/* Render each product using the Product component */}
                            </Col>
                        ))}
                    </Row>}

        </div>
    )
}

export default HomeScreen