import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const ReviewItems = ({ product, handleRemoveFromCart }) => {
    console.log(product);
    const { img, id, price, name, quantity } = product;
    return (
        <div className='review-items flex justify-center'>
            <div className=" w-2/5 flex items-center justify-between 
            bg-base-100 shadow-xl border-2 rounded my-4">
                <div className='flex items-center' >
                    <img className='p-2 w-32' src={img} alt="items" />
                    <div className='p-2'>
                        <h1 className=' font-semibold text-xl'>{name}</h1>
                        <p>Price: <span className='font-medium text-orange-400'>${price}</span> </p>
                        <p>Order quantity: <span className='font-medium text-orange-400'>{quantity}</span> </p>
                    </div>
                </div>
                <div className='pr-2'>
                    <button className=' bg-red-200 rounded-full w-16 h-16
                     flex items-center justify-center'>
                        <FontAwesomeIcon onClick={() => handleRemoveFromCart(id)} className='cursor-pointer w-12 h-8  text-red-600' icon={faTrashAlt} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewItems;