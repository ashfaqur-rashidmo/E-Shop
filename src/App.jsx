import { BrowserRouter,Routes,Route } from "react-router-dom"
import Navbar from "./Components/Navbar"
import Footer from "./Components/Footer"
import Home from "./Pages/Home"
import Shop from "./Pages/Shop"
import Cart from "./Pages/Cart"
import Checkout from "./Components/Checkout"
import { useState } from "react"
import Order from "./Pages/Order"
import Filter from "./Components/Filter"
import Login from "../Firebase/Login"
import Signup from "../Firebase/Register"
function App() {
  const [order,setOrder] = useState(null)
  const[showLogin,setShowLogin] = useState(true)
  return (
     
      

    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/shop" element={<Shop/>}></Route>
      <Route path="/cart" element={<Cart/>}></Route>
      <Route path="/checkout" element={<Checkout setOrder={setOrder}/>}></Route>
      <Route path="/order-confirmation" element={<Order order={order}/>}></Route>
      <Route path="/filter-data" element={<Filter/>}></Route>
    </Routes>
    <Footer/>
    </BrowserRouter>
   
    
  )
}

export default App