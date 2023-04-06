import React, { useState } from 'react';
import './Product.css'

const Product = (props) => {
    const { name, price, img, seller, ratings, quantity } = props.product;
    const handleAddToCart = props.handleAddToCart;
    // console.log(props.handleAddToCart);

    return (
        <div >
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure className="p-2">
                    <img src={img} alt="Shoes" className="rounded-xl" />
                </figure>
                <div className="card-body p-2 ">
                    <div className="p-3">
                        <h2 className="card-title">{name}</h2>
                        <h4 className="card-title mb-10">Price:${price}</h4>
                        <p>Manufacturer : {seller}</p>
                        <p>Rating : {ratings}</p>
                    </div>
                </div>
                <div className="card-actions mt-4">
                    <button onClick={() => handleAddToCart(props.product)}
                        className="btn w-full bg-orange-200 hover:bg-orange-500 
                        text-black rounded-ee-md border-none">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default Product;