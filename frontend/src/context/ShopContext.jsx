import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '£';
    const delivery_fee = 10;

    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const navigate = useNavigate();

    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error('Select Product Size');
            return;
        }
        let cartData = structuredClone(cartItems);
        cartData[itemId] = cartData[itemId] || {};
        cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
        setCartItems(cartData);
    }

    const getCartCount = () => {
        return Object.values(cartItems).reduce((totalCount, itemSizes) => {
            const itemCount = Object.values(itemSizes).reduce((sizeCount, count) => sizeCount + count, 0);
            return totalCount + itemCount;
        }, 0);
    }

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);
    }

    const getCartAmount = () => {
        if (!products || !cartItems) return 0;

        const productMap = products.reduce((map, product) => {
            map[product._id] = product;
            return map;
        }, {});

        const totalAmount = Object.entries(cartItems).reduce((total, [itemId, sizes]) => {
            const itemInfo = productMap[itemId];

            if (!itemInfo) {
                console.error(`Product with ID ${itemId} not found`);
                return total;
            }

            const itemTotal = Object.entries(sizes).reduce((subTotal, [size, quantity]) => {
                return subTotal + (itemInfo.price * quantity);
            }, 0);

            return total + itemTotal;
        }, 0);

        return totalAmount;
    };

    const value = {
        products,
        currency,
        delivery_fee,
        search, setSearch,
        showSearch, setShowSearch,
        cartItems, addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate
    }


    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;