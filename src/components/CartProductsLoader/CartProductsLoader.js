import { getShoppingCart } from "../../utilities/fakedb";

const cartProductLoader = async () => {

    const storedCart = getShoppingCart();
    console.log(storedCart);
    const ids = Object.keys(storedCart);

    const loadedProducts = await fetch('http://localhost:5000/productsByIds', {
        
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(ids)

    });
    const products = await loadedProducts.json();


    // if cart data is in database, you have to use async await


    const savedCart = [];

    for (const id in storedCart) {
        const addedProduct = products.find(pd => pd._id === id);
        if (addedProduct) {
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            savedCart.push(addedProduct);
        }
    }
    return savedCart;
}

export default cartProductLoader;