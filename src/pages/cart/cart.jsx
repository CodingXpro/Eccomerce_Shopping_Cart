import React, { useContext } from 'react'
import { PRODUCTS } from '../../products'
import { ShopContext } from '../../context/shop-context';
import { CartItem } from './cart-item';
import './cart.css'
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cartItems, getTotalCartAmount } = useContext(ShopContext);
    const totalAmount = getTotalCartAmount();
    const navigate = useNavigate();
    return (
        <div className='cart'>
            <div>
                <h1>Your Cart items</h1>
            </div>
            <div className='cartItems'>
                {PRODUCTS.map((Product) => {
                    if (cartItems[Product.id] !== 0) {
                        return <CartItem data={Product} />
                    }

                })}
            </div>
            {totalAmount > 0 ? (
                <div className='checkout'>
                    <p>SubTotal:${totalAmount}</p>
                    <button onClick={(() => { navigate("/") })}>Continue Shopping</button>
                    <button>Checkout</button>
                </div>
            ) : (<h1>Your Cart is Empty</h1>)}

        </div>
    )
}

export default Cart