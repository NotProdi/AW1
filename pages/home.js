// home.js

import { addProductToCart } from '../utils/localStorageController.js';

const getUserData = (key) => {
    return JSON.parse(sessionStorage.getItem(key));
};

const logOut = (key) => {
    sessionStorage.removeItem(key);
};

window.addEventListener('load', () => {
    // Obtener la data desde sessionStorage
    const userInfo = getUserData('userData');
    console.log(userInfo);

    document.getElementById('btnLogOut').addEventListener('click', () => {
        logOut('userData');
        window.location.href = 'http://127.0.0.1:5500/pages/login.html';
    });
});

fetch('/data/products.json')
    .then((response) => response.json())
    .then((data) => {
        // Agrupar los productos por categoría
        const categories = {
            Zapatillas: [],
            Gorras: [],
            Chombas: [],
        };

        // Clasificar los productos por categoría
        data.forEach((product) => {
            categories[product.categoria].push(product);
        });

        // Generar las cards para cada categoría
        Object.keys(categories).forEach((category) => {
            const products = categories[category];
            const container = document.getElementById(`${category.toLowerCase()}-container`);
            products.forEach((product) => {
                container.innerHTML += createCard(product);
            });
        });
    })
    .catch((error) => console.log('Error loading products:', error));

// Función para crear una tarjeta de producto
function createCard(product) {
    return `
        <div class="col">
            <div class="card">
                <img src="${product.imagen}" class="card-img-top" alt="${product.titulo}">
                <div class="card-body">
                    <h5 class="card-title">${product.titulo}</h5>
                    <p class="card-text">${product.descripcion}</p>
                </div>
                <div class="card-footer d-flex justify-content-between align-items-center">
                    <p class="price mb-0 text-start" style="font-weight: bold;">$${product.precio}</p>
                    <input type="number" class="form-control numericUpDown" style="width: 60px;" min="0" max="10" placeholder="0" step="1" />
                    <button id="btnAgregar" class="btn btn-success" data-product-id="${product.id}">Agregar</button>
                </div>
            </div>
        </div>
    `;
}

// Función para manejar el evento click para el botón "Agregar"
document.addEventListener('click', (event) => {
    if (event.target && event.target.id === 'btnAgregar') {
        const productId = event.target.getAttribute('data-product-id');
        const productElement = event.target.closest('.card');
        const product = getProductFromCard(productElement, productId);

        if (product) {
            // Obtener el valor del input number
            const quantityInput = productElement.querySelector('.numericUpDown');
            const quantity = parseInt(quantityInput.value);

            // Verificar que la cantidad sea mayor que 0
            if (quantity === 0 || quantityInput.placeholder === quantityInput.value) {
                alert('Debe seleccionar al menos un producto.');
                return;
            }

            // Establecer la cantidad correcta en el producto
            product.quantity = quantity;
            // Actualizar el precio basado en la cantidad seleccionada
            product.precioTotal = product.precio * quantity;

            saveProductToCart(product);
            console.log('Producto agregado al carrito:', product);  // Agregado para verificar los datos
            alert('Producto agregado al carrito!');
        }
    }
});

// Función para obtener los datos del producto desde la tarjeta
function getProductFromCard(productElement, productId) {
    const priceText = productElement.querySelector('.price').textContent.replace('$', '');
    const product = {
        id: productId,
        titulo: productElement.querySelector('.card-title').textContent,
        descripcion: productElement.querySelector('.card-text').textContent,
        precio: parseFloat(priceText),
        imagen: productElement.querySelector('.card-img-top').getAttribute('src')
    };
    return product;
}

// Función para guardar el producto en el carrito (localStorage)
const saveProductToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Comprobar si el producto ya existe en el carrito
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    if (existingProductIndex >= 0) {
        // Si ya existe, actualizar la cantidad y el precio total
        cart[existingProductIndex].quantity += product.quantity;
        cart[existingProductIndex].precioTotal = cart[existingProductIndex].precio * cart[existingProductIndex].quantity;
    } else {
        // Si no existe, agregar el producto al carrito
        product.precioTotal = product.precio * product.quantity;  // Establecer el precio total
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('Carrito actual:', cart);  // Mostrar el carrito completo después de agregar el producto
}
