import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import './Shop.css'
import Cart from '../Cart/Cart';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import { Link, useLoaderData } from 'react-router-dom';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(9);
    const [cart, setCart] = useState([]);

    // pagination
    const { totalProducts } = useLoaderData();


    // const itemsPerPage = 10; //make it dynamic
    const totalPages = Math.ceil(totalProducts / itemsPerPage);
    const pageNumbers = [...Array(totalPages).keys()];


    useEffect(() => {
        async function fetchData() {

            const response = await fetch(`http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}`);
            const data = await response.json();
            setProducts(data)
            // .then(res => res.json())
            // .then(data => setProduct(data))
        }
        fetchData();

    }, [currentPage, itemsPerPage]);


    // useEffect(() => {
    //     fetch('http://localhost:5000/products')
    //         .then(res => res.json())
    //         .then(data => setProduct(data))
    // }, []);

    useEffect(() => {
        const storedCart = getShoppingCart();
        const ids = Object.keys(storedCart);

        fetch('http://localhost:5000/productsByIds', {

            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ids)

        })
            .then(res => res.json())
            .then(cartProducts => {
                // console.log('only products in shopping cart:', cartProducts);
                const savedCart = [];
                //step1: get id 
                for (const id in storedCart) {
                    // step2: get the product from products by using id
                    const addedProduct = cartProducts.find(product => product._id === id)
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
            })


    }, []);

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

    const options = [6, 9, 15, 18];
    function handleSelectChange(event) {
        setItemsPerPage(parseInt(event.target.value));
        setCurrentPage(0);
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
                {/* <p>currentPage: {currentPage + 1}</p> */}
                {
                    pageNumbers.map(number => <button

                        key={number}
                        onClick={() => setCurrentPage(number)}
                        className={currentPage === number ? 'btn page-button' : 'btn btn-outline'}
                    >{number + 1}</button>)
                }
               
                <select value={itemsPerPage}
                    onChange={handleSelectChange}>

                    {
                        options.map(option => <option key={option} value={option}>
                            {option}
                        </option>
                        )
                    }
                </select>
            </div >
        </>
    );
};

export default Shop;