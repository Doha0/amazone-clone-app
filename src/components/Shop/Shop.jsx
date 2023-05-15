import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import './Shop.css'
import Cart from '../Cart/Cart';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import { Link } from 'react-router-dom';

const Shop = () => {
    const [products, setProduct] = useState([]);
    const [cart, setCart] = useState([]);
    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProduct(data))
    }, []);

    useEffect(() => {
        const storedCart = getShoppingCart();
        const savedCart = [];
        //step1: get id 
        for (const id in storedCart) {
            // step2: get the product from products by using id
            const addedProduct = products.find(product => product.id === id)
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
        const exists = cart.find(pd => pd.id === product.id);
        if (!exists) {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        else {
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd.id !== product.id)
            newCart = [...remaining, exists];

        }
        setCart(newCart);
        addToDb(product.id)
    }

    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }
    return (
        <div className='container mx-auto Shop-container mt-32 gap-4 '>
            <div className='products-container gap-8'>
                {
                    products.map(product => <Product
                        key={product.id}
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
    );
};

export default Shop;