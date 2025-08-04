import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useState,useEffect } from "react";
import Modal from "./Modal";
import Login from "./../../Firebase/Login";
import Register from "../../Firebase/Register";
import { setSearchTerm } from "../Redux/Product";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase/firebase-config"; 

const Navbar = () => {
    const [isModelOpen, setIsModelOpen] = useState(false); 
    const [isLogin, setIsLogin] = useState(true);
    const [user, setUser] = useState(null);
    const products = useSelector(state => state.cart.products);
    const [search,setSearch] = useState()
    const dispatch = useDispatch()
    const navigate =useNavigate()


const handleLogout = async () => {
  try {
    await signOut(auth);
    setUser(null); 
    navigate('/'); 
  } catch (error) {
    console.error("Logout error:", error);
  }
};


    useEffect(() => {
  const auth = getAuth();
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  return () => unsubscribe();
}, []);

    const handleSearch = (e) => {
        e.preventDefault()
        dispatch(setSearchTerm(search))
        navigate('/filter-data')
    }
    const openSignUp = () => {
        setIsLogin(false);
        setIsModelOpen(true); 
    };

    const openLogin = () => {
        setIsLogin(true);
        setIsModelOpen(true); 
    };
    
    return (
        <nav className='bg-white shadow-md'>
            <div className='container mx-auto px-4 md:px-16 lg:px-24 py-4 flex justify-between items-center'>
                <div className='text-lg font-bold'>
                    <Link to="/">E-shop</Link>
                </div>
                <div className='relative flex-1 mx-4'>
                    <form onSubmit={handleSearch}>
                        <input type="text" placeholder='Search Products' className='w-full border py-2 px-4' onChange={(e)=> setSearch(e.target.value)}/>
                        <FaSearch className='absolute top-3 right-3 text-red-500'></FaSearch>
                    </form>
                </div>
                <div className='flex items-center space-x-4'>
  <Link to="/cart" className='relative'>
    <FaShoppingCart className='text-lg' />
    {products.length > 0 && (
      <span className='absolute top-0 text-xs w-3 left-3 bg-red-600 rounded-full flex justify-center items-center text-white'>
        {products.length}
      </span>
    )}
  </Link>

{user ? (
  <div className="flex items-center gap-2">
    <span className="text-sm text-gray-700">Hi, {user.email}</span>
    <button 
      onClick={handleLogout} 
      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
    >
      Logout
    </button>
  </div>
) : (
  <>
    <button className='hidden md:block' onClick={openLogin}>
      Login | Register
    </button>
    <button className='block md:hidden' onClick={openLogin}>
      <FaUser />
    </button>
  </>
)}

</div>

            </div>
            <div className='flex items-center justify-center space-x-10 py-4 text-sm font-bold'>
                <Link to="/" className='hover:underline'>
                    Home
                </Link>
                <Link to="/shop" className='hover:underline'>
                    Shop
                </Link>
                <Link to="/contact" className='hover:underline'>
                    Contact
                </Link>
                <Link to="/about" className='hover:underline'>
                    About
                </Link>
            </div>
            
          <Modal isModelOpen={isModelOpen} setIsModelOpen={setIsModelOpen}>
  {isLogin ? (
    <Login openSignUp={openSignUp} setIsModelOpen={setIsModelOpen} />
  ) : (
    <Register openLogin={openLogin} setIsModelOpen={setIsModelOpen} />
  )}
</Modal>


        </nav>
    );
};

export default Navbar;