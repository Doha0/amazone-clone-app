import React, { useState } from 'react';
import Cart from '../Cart/Cart';
import { Link, useLoaderData } from 'react-router-dom';
import ReviewItems from '../ReviewItems/ReviewItems';
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';



const Orders = () => {
    const savedCart = useLoaderData();
    const [cart, setCart] = useState(savedCart);

    const handleRemoveFromCart = (id) => {
        // console.log(id);
        const remaining = cart.filter(product => product.id !== id);
        setCart(remaining);
        removeFromDb(id);
    }
    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    return (
        <div className='Shop-container my-20'>
            <div className='review-container'>
                {
                    cart?.map(product => <ReviewItems
                        key={product.id}
                        product={product}
                        handleRemoveFromCart={handleRemoveFromCart}
                    >
                    </ReviewItems>)
                }

            </div>

            <div className='cart-container mr-12'>
                <Cart
                    cart={cart}
                    handleClearCart={handleClearCart}
                ><Link to='/inventory'><button className="btn w-full bg-orange-600 border-0 hover:bg-orange-800 font-medium text-lg text-white">Payment</button></Link>
                </Cart>
            </div>

        </div>
    );
};

export default Orders;