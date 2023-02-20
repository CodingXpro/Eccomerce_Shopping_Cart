import React, { createContext, useState } from 'react'
import { PRODUCTS } from '../products';

//set to all item is zero
const getItem = () => {
    let cart = {};
    for (let i = 1; i < PRODUCTS.length + 1; i++) {
        cart[i] = 0;
    }
    return cart;
}

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(getItem());

    //Add item in the cart

    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))

    }

    const updateCartItemCount = (newAmount, itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: newAmount }))
    }

    //Remove the item with the backspace
    // const keyDownEvent = (event) => {
    //     var key = event.keyCode;
    //     if (key == "46") {
    //         var InputValue = $("#TestInput").val();
    //         InputValue = InputValue.substr(0, InputValue.length - 1);
    //         $("#TestInput").val(InputValue);
    //     }
    // }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = PRODUCTS.find((product) => product.id === Number(item));
                const price = itemInfo.price;
                totalAmount += cartItems[item] * price;
            }
        }
        return totalAmount;
    }

    //Remove from the cart    
    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))

    }
    const contextValue = { cartItems, addToCart, removeFromCart, updateCartItemCount, getTotalCartAmount }

    return (
        <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>
    )
}
