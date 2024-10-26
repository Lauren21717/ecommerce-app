import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../component/Title';
import { assets } from '../assets/assets';
import CartTotal from '../component/CartTotal';


const Cart = () => {

  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];

    Object.keys(cartItems).forEach((productId) => {
      const productSizes = cartItems[productId];

      Object.keys(productSizes).forEach((size) => {
        const quantity = productSizes[size];

        if (quantity > 0) {
          tempData.push({
            _id: productId,
            size: size,
            quantity: quantity
          });
        }
      });
    });
    setCartData(tempData);
  }, [cartItems])

  return (
    <div className='border-t pt-14'>

      <div className="text-2xl mb-3">
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div>
        {
          cartData.map((item, index) => {

            const productData = products.find((product) => product._id === item._id);

            return (
              <div key={index} className="cart-items">
                <div className='flex items-start gap-6'>

                  <img
                    className='w-16 sm:w-20'
                    src={productData.image[0]}
                    alt="Product Image" />

                  <div>
                    <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                    <div className='flex items-center gap-5 mt-2'>
                      <p>{currency}{productData.price}</p>
                      <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
                    </div>
                  </div>

                </div>
                <input
                  onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))}
                  className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1'
                  type="number"
                  min={1}
                  defaultValue={item.quantity} />
                <img
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                  src={assets.bin_icon}
                  className='w-4 mr-4 sm:w-5 cursor-pointer'
                  alt="Delete Item" />
              </div>
            )

          })
        }
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className='w-full text-end'>
            <button
              onClick={() => navigate('/place-order')}
              className='bg-black text-white text-sm my-8 px-8 py-3'>
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Cart