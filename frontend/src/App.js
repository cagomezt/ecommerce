import {Container} from 'react-bootstrap'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import Footer from './components/Footer'
import Header from './components/Header'

import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'

/**
 * App component serves as the root component of the application.
 * It sets up the routing for the application and includes the Header, Footer, and main content area.
 *
 * @component
 * @returns {JSX.Element} The rendered App component.
 */
function App() {
    return (
        <Router>
            {/* Render the Header component */}
            <Header/>
            <main className="py-3">
                <Container>
                    <Routes>
                        {/* Route for the home screen */}
                        <Route path='/' element={<HomeScreen/>}/>
                        {/* Route for the product details screen */}
                        <Route path='/product/:id' element={<ProductScreen/>}/>
                    </Routes>
                </Container>
            </main>
            {/* Render the Footer component */}
            <Footer/>
        </Router>
    );
}

export default App;