// import React from 'react';
// import Card from '../Components/ProductCard/Card.jsx';
// import { useSelector } from 'react-redux';
// const Shop = () => {
    // const Products = useSelector(state => state.product);
//     return (
        // <div className='mx-auto py-12 px-4 md:px-16 lg:px-24'>
        //        <div className='container mx-auto py-12'>
        //         <h2 className='text-2xl font-bold mb-6 text-center '>Shop</h2>
        //      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 cursor-pointer'>
        //     {Products.products.map(((product) =>(
        //         <Card key={product.id} product={product}/>
        //     )))}
        // </div>
        // </div>
        // </div>
//     );
// };

// export default Shop;
import Card from '../Components/ProductCard/Card.jsx';
import { useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Display = () => {
  const [user, setUser] = useState(null);
  const Products = useSelector(state => state.product);
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  if (!user) {
    return (
      <div className="text-center mt-10 text-xl text-red-500">
        Please login to view products.
      </div>
    );
  }

  return (
    <div>
      <div className='mx-auto py-12 px-4 md:px-16 lg:px-24'>
               <div className='container mx-auto py-12'>
                <h2 className='text-2xl font-bold mb-6 text-center '>Shop</h2>
             <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 cursor-pointer'>
            {Products.products.map(((product) =>(
                <Card key={product.id} product={product}/>
            )))}
        </div>
        </div>
        </div>
    </div>
  );
};

export default Display;
