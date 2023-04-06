import React from 'react';
import './Cart.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'


const cart = ({ cart, handleClearCart, children }) => {
    let totalPrice = 0;
    let totalShipping = 0;
    let quantity = 0;
    for (const product of cart) {
        /* if(product.quantity === 0){
        product.quantity = 1;}
       product.quantity = product.quantity || 1; */
        totalPrice = totalPrice + product.price * product.quantity;
        totalShipping = totalShipping + product.shipping;
        quantity = quantity + product.quantity;
    }
    const tax = totalPrice * 7 / 100;
    const grandTotal = totalPrice + totalShipping + tax;
    return (
        <div className='cart'>
            <p className='text-2xl text-center font-medium mb-8 '>Order Summary</p>
            <p className='py-2'>Selected Items: {quantity} </p>
            <p className='py-2'>Total Price: ${totalPrice}</p>
            <p className='py-2'>Total Shipping Charge: ${totalShipping}</p>
            <p className='py-2'>Tax: ${tax.toFixed(2)}</p>
            <h6 className='py-2 text-xl font-medium'>Grand Total: ${grandTotal.toFixed(2)}</h6>
            <button onClick={handleClearCart} className='btn btn-secondary w-full font-medium text-lg flex my-4' >Clear Cart
                <FontAwesomeIcon className='cursor-pointer w-8 h-6  text-white-600 ml-2' icon={faTrashAlt} />
            </button>
            {children}
        </div>
    );
};

export default cart;