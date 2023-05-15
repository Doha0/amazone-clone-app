import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import './Shop.css'
import Cart from '../Cart/Cart';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import { Link, useLoaderData } from 'react-router-dom';

const Shop = () => {
    const [products, setProduct] = useState([]);
    const [cart, setCart] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);


    // pagination
    const { totalProducts } = useLoaderData();
    // const itemsPerPage = 10; //make it dynamic
    const totalPages = Math.ceil(totalProducts / itemsPerPage);
    const pageNumbers = [...Array(totalPages).keys()];


    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(res => res.json())
            .then(data => setProduct(data))
    }, []);

    useEffect(() => {
        const storedCart = getShoppingCart();
        const savedCart = [];
        //step1: get id 
        for (const id in storedCart) {
            // step2: get the product from products by using id
            const addedProduct = products.find(product => product._id === id)
            if (addedProduct) {
                // step3: get quantity of the product
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                // step4: add the added product to the saved cart
                savedCart.push(addedProduct);
                // step5: set the cart
                setCart(savedCart);
            }
        }
    }, [products]);

    const handleAddToCart = (product) => {
        let newCart = [];
        // const newCart = [...cart, product];
        // if product doesn't exist int the cart, then set quantity = 1
        // if exist update quantity 1
        const exists = cart.find(pd => pd._id === product._id);
        if (!exists) {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        else {
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd._id !== product._id)
            newCart = [...remaining, exists];

        }
        setCart(newCart);
        addToDb(product._id)
    }

    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }
    return (
        <>
            <div className='container mx-auto Shop-container mt-32 gap-4 '>
                <div className='products-container gap-8'>
                    {
                        products.map(product => <Product
                            key={product._id}
                            product={product}
                            handleAddToCart={handleAddToCart}
                        >
                        </Product>)
                    }
                </div>

                <div className='cart-container'>
                    <Cart
                        cart={cart}
                        handleClearCart={handleClearCart}
                    >
                        <Link to='/orders'><button className="btn w-full bg-orange-600 border-0 hover:bg-orange-800 font-medium text-lg text-white">Review Orders</button></Link>
                    </Cart>
                </div>
            </div>

            {/* Pagination */}

            <div className='text-center space-x-5 my-10'>
                <p>currentPage: {currentPage}</p>
                {
                    pageNumbers.map(number => <button

                        key={number}
                        onClick={() => setCurrentPage(number)}
                        className={currentPage === number ? 'btn page-button' : 'btn btn-outline'}
                    >{number}</button>)
                }
            </div>
        </>
    );
};

export default Shop;