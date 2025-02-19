import logo from './logo.svg';
import './App.css';
import ProductScreen from './screens/ProductScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          
          <Route path='/product/:id' component={ProductScreen} />

          <Route
            path='/admin/productlist'
            component={ProductListScreen}
            exact
          />
          <Route
            path='/admin/productlist/:pageNumber'
            component={ProductListScreen}
            exact
          />
          <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App;
