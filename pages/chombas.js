import Card from '../components/card.js';
import { addProductToCart } from '../utils/localStorageController.js';

// Obtener productos desde un archivo o API
fetch('/data/products.json')
    .then((response) => response.json())
    .then((data) => {
        // Filtrar productos por categoría 'Chombas'
        const chombas = data.filter(product => product.categoria === 'Chombas');
        const container = document.getElementById('chombas-container');

        // Renderizar las tarjetas utilizando el componente Card
        chombas.forEach((product) => {
            container.innerHTML += Card(product);
        });
    })
    .catch((error) => console.log('Error loading products:', error));

// Evento para manejar clics en los botones "Agregar"
document.addEventListener('click', (event) => {
    if (event.target && event.target.id === 'btnAgregar') {
        const productId = event.target.getAttribute('data-product-id');
        const productElement = event.target.closest('.card');
        const product = getProductFromCard(productElement, productId);

        if (product) {
            // Verificar la cantidad seleccionada
            const quantityInput = productElement.querySelector('.numericUpDown');
            const quantity = parseInt(quantityInput.value);

            if (quantity === 0 || !quantity) {
                alert('Debe seleccionar al menos un producto.');
                return;
            }

            product.quantity = quantity;
            saveProductToCart(product);
            alert('Producto agregado al carrito!');
        }
    }
});

// Función para extraer datos del producto desde la tarjeta
function getProductFromCard(productElement, productId) {
    const priceText = productElement.querySelector('.price').textContent.replace('$', '');
    return {
        id: productId,
        titulo: productElement.querySelector('.card-title').textContent,
        descripcion: productElement.querySelector('.card-text').textContent,
        precio: parseFloat(priceText),
        imagen: productElement.querySelector('.card-img-top').getAttribute('src')
    };
}

// Función para guardar el producto en el carrito (localStorage)
const saveProductToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cart.findIndex(item => item.id === product.id);

    if (existingProductIndex >= 0) {
        cart[existingProductIndex].quantity += product.quantity;
    } else {
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
};
