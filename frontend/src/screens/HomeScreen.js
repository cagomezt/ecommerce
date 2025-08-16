import React, {useState, useEffect} from 'react'
import {Row, Col} from 'react-bootstrap'
import Product from "../components/Product";
import axios from 'axios'

/**
 * HomeScreen component displays the homepage with a list of the latest products.
 * It fetches product data from the backend API and renders it in a responsive grid layout.
 *
 * @component
 * @returns {JSX.Element} The rendered HomeScreen component.
 */
function HomeScreen() {
    // State to store the list of products
    const [products, setProducts] = useState([])

    useEffect(() => {
        /**
         * Fetches the list of products from the backend API.
         * This function is called when the component mounts.
         */
        async function fetchProducts() {
            const {data} = await axios.get('/api/products') // API call to fetch products
            setProducts(data) // Update the state with the fetched products
        }

        fetchProducts() // Call the fetchProducts function

        // Optional cleanup function can be returned here if needed
    }, []); // Dependency array ensures this effect runs only once on mount

    return (
        <div>
            <h1>Latest Products</h1>
            <Row>
                {products.map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product}/> {/* Render each product using the Product component */}
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default HomeScreen