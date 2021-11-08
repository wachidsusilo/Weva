import './App.scss'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import Home from './pages/home/Home'
import Catalog from './pages/catalog/Catalog'
import Combed from './pages/combed/Combed'
import Price from './pages/price/Price'
import Shop from './pages/shop/Shop'
import Blog from './pages/blog/Blog'
import About from './pages/about/About'
import Warehouse from './pages/warehouse/Warehouse'
import Product from './pages/product/Product'

function App() {
    return (
        <Router>
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/about' exact component={About} />
                <Route path='/blog' exact component={Blog} />
                <Route path='/catalog'exact component={Catalog} />
                <Route path='/combed' exact component={Combed} />
                <Route path='/price' exact component={Price} />
                <Route path='/product' component={Product} />
                <Route path='/shop' exact component={Shop} />
                <Route path='/warehouse' exact component={Warehouse} />
                <Redirect to='/' />
            </Switch>
        </Router>
    )
}

export default App
