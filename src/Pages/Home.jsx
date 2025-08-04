import { useEffect } from 'react';
import { Categories, Data } from '../assets/mockData.jsx';
import hero from '../assets/Images/hero-page.png';
import Info from '../Components/Info';
import Category from '../Components/Category';
import { setProducts } from '../Redux/Product.jsx';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../Components/ProductCard/Card.jsx';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../Firebase/firebase-config.js';

const Home = () => {
    const dispatch = useDispatch();
    const Products = useSelector(state => state.product);
    const [user,loading] = useAuthState(auth)

    useEffect(() => {
        dispatch(setProducts(Data));
    }, [dispatch]);

    return (
        <div className='bg-white mt-2 px-4 md:px-16 lg:px-24'>
            <div className='container mx-auto py-4 flex flex-col md:flex-row space-x-2'>
                <div className='w-full md:w-3/12'>
                    <div className='bg-red-600 text-white text-xs font-bold px-2 py-2.5'>Shop By Categories</div>
                    <div className='space-y-4 bg-gray-100 p-3 border'>
                        {Categories.map((category, index) => (
                            <li key={index} className='flex items-center text-sm font-medium'>
                                <div className='w-2 h-2 border border-red-500 rounded-full mr-3'></div>
                                {category}
                            </li>
                        ))}
                    </div>
                </div>
                <div className='w-full md:w-9/12 mt-8 md:mt-0 h-96 relative'>
                    <img src={hero} alt="" className='h-96 w-full'/>
                    <div className='absolute top-20 left-8'>
                        <p className='text-gray-600 mb-4'>Talk with Ashfaq</p>
                        <h2 className='text-3xl font-bold text-gray-800'>Welcome to E-shop</h2>
                        <p className='text-xl mt-2.5 font-bold text-gray-800'>Millions+ Products</p>
                        <button className=' bg-red-600 px-8 py-1.5 text-white mt-4 hover:bg-red-700 transform transition-transform duration-300 hover:scale-105'>Shop Now</button>
                    </div>
                </div>
            </div>
            <Info/>
            <Category/>
            <div className='container mx-auto py-12'>
                <h2 className='text-2xl font-bold mb-6 text-center '>Top Products</h2>
                {loading ? (
                    <p className='text-center text-gray-500'>Checking Login Status</p>
                ) : user ? (
                 <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 cursor-pointer'>
            {Products.products.slice(0, 5).map(((product) =>(
                <Card key={product.id} product={product}/>
            )))}
            </div>
            ) : (
                <div className='text-center text-red-600 text-sm'>
                    You must be logged in to view Products
                </div>
            )}
             
        </div>
        {/* <Shop/> */}
        </div>
    );
};

export default Home;