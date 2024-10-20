import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import Productitem from './Productitem';

const LatestCollection = () => {

    const { products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        setLatestProducts(products.slice(0, 10));
    }, [])

    return (
        <div className='my-10'>
            <div className="text-center py-8 text-3xl">
                <Title text1={'LATEST'} text2={'COLLECTIONS'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm ms-test-base text-gray-600'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
            </div>

            {/* Rendering Products */}
            <div className="product-display">
                {
                    latestProducts.map((item, index) => (
                        <Productitem  key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                    ))
                }
            </div>

        </div>
    )
}

export default LatestCollection