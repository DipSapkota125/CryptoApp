import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import './App.css'
import Home from './components/pages/home/Home'
import CoinDetails from './components/pages/home/coinDetails/CoinDetails'
import Header from './components/header/Header'

function App() {


  return (
    <>
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/coin-details/:id' element={<CoinDetails />} />


      </Routes>
    </Router>
      
    </>
  )
}

export default App
