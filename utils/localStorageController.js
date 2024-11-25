// localStorageController.js
const addProductToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
}

const getCartProducts = () => {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

const clearCart = () => {
    localStorage.removeItem('cart');
}

export { addProductToCart, getCartProducts, clearCart };