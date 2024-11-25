// /**Json*/
// const jsonContainer = document.getElementById('jsonContainer')

// fetch('./data/products.json').then(res => res.json()).then(data => {

//     const jsonFormat = JSON.stringify(data.filter(e => e.categoria === "Gorras"))
//     console.log(jsonFormat)
//     console.log(data)
//     jsonContainer.textContent = jsonFormat
// }).catch(error =>{
//     console.log(error)
// })



/**NavBar */
import { navbarComponent } from "./navbar.js"

let navContainer = document.querySelector("header")

window.addEventListener("load", () => {
    // Obtener la ruta actual de la página
    const currentPage = window.location.pathname;

    // Verificar si estamos en login.html, registro.html o index.html
    if (!currentPage.includes('login.html') && !currentPage.includes('registro.html') && !currentPage.includes('index.html')) {
        navContainer.innerHTML = navbarComponent;

        // Verificar si el botón de logout existe antes de agregar el eventListener
        const btnLogOut = document.getElementById('btnLogOut');
        if (btnLogOut) {
            btnLogOut.addEventListener('click', () => {
                // Verifica si la función logOut existe y luego ejecutarla
                const userDataKey = 'userData';
                sessionStorage.removeItem(userDataKey);
                window.location.href = 'http://127.0.0.1:5500/pages/login.html';
            });
        } else {
            console.log('Botón de logout no encontrado. Esto es esperado en login.html, registro.html o index.html');
        }
    }
    // Asegurarse de que no se intente añadir el eventListener si el botón no está presente en home.html
    if (currentPage.includes('home.html')) {
        const btnLogOut = document.getElementById('btnLogOut');
        if (btnLogOut) {
            btnLogOut.addEventListener('click', () => {
                const userDataKey = 'userData';
                sessionStorage.removeItem(userDataKey);
                window.location.href = 'http://127.0.0.1:5500/pages/login.html';
            });
        }
    }
});

// /components/index.js
import Card from './card.js';

document.addEventListener('DOMContentLoaded', () => {
    // Asignar la categoría a cargar desde la URL
    const category = window.location.pathname.split('/').pop().split('.').shift(); // Zapatillas, Gorras, Chombas

    // Cargar productos desde el archivo JSON
    fetch('/data/products.json')
        .then(response => response.json())
        .then(products => {
            // Filtrar productos según la categoría
            const filteredProducts = products.filter(product => product.categoria.toLowerCase() === category.toLowerCase());

            // Crear las cards de productos
            const cardsContainer = document.createElement('div');
            cardsContainer.classList.add('row', 'g-4');

            filteredProducts.slice(0, 10).forEach(product => {
                const productCard = Card(product);  // Aquí se pasan las propiedades del producto
                cardsContainer.innerHTML += productCard;
            });

            // Insertar las cards en el cuerpo del documento
            document.body.appendChild(cardsContainer);
        })
        .catch(error => console.error('Error loading products:', error));
});

