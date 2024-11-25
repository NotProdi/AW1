// carrito.js

// Función para obtener los productos del carrito desde el localStorage
const getCartProducts = () => {
    return JSON.parse(localStorage.getItem('cart')) || [];
};

// Función para actualizar la tabla de carrito
const updateCartTable = () => {
    const cartProducts = getCartProducts();
    const tableBody = document.getElementById('cart-table-body');
    tableBody.innerHTML = ''; // Limpiar tabla antes de llenarla

    // Llenar la tabla con los productos del carrito
    cartProducts.forEach((product, index) => {
        const row = document.createElement('tr');
        const totalPrice = product.precio * product.quantity; // Precio total para este producto

        row.innerHTML = `
            <td>${product.titulo}</td>
            <td>${product.quantity}</td>
            <td>$${totalPrice}</td>
            <td><button class="btn btn-danger btn-sm" data-index="${index}">Eliminar</button></td>
        `;
        tableBody.appendChild(row);
    });

    // Asociar eventos a los botones de eliminar
    document.querySelectorAll('.btn-danger').forEach((button) => {
        button.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index'); // Obtener índice del botón
            removeProductFromCart(index); // Llamar a la función para eliminar producto
        });
    });

    // Calcular el total del carrito
    const total = cartProducts.reduce((acc, product) => acc + (product.precio * product.quantity), 0);
    document.getElementById('total-price').textContent = `$${total}`;
};

// Función para eliminar un producto del carrito
const removeProductFromCart = (index) => {
    const cartProducts = getCartProducts();
    cartProducts.splice(index, 1); // Eliminar el producto por su índice
    localStorage.setItem('cart', JSON.stringify(cartProducts)); // Actualizar el localStorage
    updateCartTable(); // Actualizar la tabla después de eliminar el producto
};

// Función para cancelar la compra
const cancelPurchase = () => {
    localStorage.removeItem('cart'); // Vaciar el carrito
    updateCartTable(); // Actualizar la tabla
};

// Función para realizar la compra
const completePurchase = () => {
    const cartProducts = getCartProducts();
    if (cartProducts.length === 0) {
        alert('Tu carrito está vacío. No puedes realizar la compra.');
        return;
    }

    // Verificar los campos del formulario de datos de envío
    const address = document.getElementById('address').value.trim();
    const postalCode = document.getElementById('postal-code').value.trim();
    const locality = document.getElementById('locality').value.trim();
    const phone = document.getElementById('phone').value.trim();

    if (!address || !postalCode || !locality || !phone) {
        alert('Complete los datos de envío antes de finalizar la compra.');
        return;
    }

    // Vaciar el carrito después de la compra exitosa
    localStorage.removeItem('cart');
    alert('¡Compra realizada con éxito!');
    updateCartTable(); // Actualizar la tabla después de la compra
};

// Actualizar la tabla cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    updateCartTable();

    // Evento para cancelar la compra
    document.getElementById('cancel-btn').addEventListener('click', cancelPurchase);

    // Evento para completar la compra
    document.getElementById('purchase-btn').addEventListener('click', completePurchase);
});

