
import Card from '../components/card.js'; 

// Contenedor donde se renderizan las tarjetas
const container = document.getElementById('cities-container');

document.querySelectorAll(".ver-detalle-btn").forEach(button => {
    button.addEventListener("click", event => {
        const cityId = event.target.getAttribute("data-id");
        console.log("Guardando ciudad seleccionada:", cityId);
        
        if (cityId) {
            localStorage.setItem("selectedCityId", cityId);
            window.location.href = "detalle.html";
        } else {
            console.error("No se encontró el ID de la ciudad en el botón");
        }
    });
});


// Cargar datos del archivo JSON
fetch('../data/ciudades.json') 
    .then((response) => {
        if (!response.ok) throw new Error('Error al cargar el archivo JSON');
        return response.json();
    })
    .then((cities) => {
        if (cities.length === 0) {
            container.innerHTML = '<p class="text-center text-muted">No hay destinos disponibles en este momento.</p>';
            return;
        }
        cities.forEach(city => {
            const col = document.createElement('div');
            col.className = 'col-md-4'; 
            col.innerHTML = Card(city);
            container.appendChild(col);
        });
    })
    .catch((error) => {
        console.error('Error cargando las ciudades:', error);
        container.innerHTML = '<p class="text-center text-danger">Ocurrió un error al cargar los destinos. Por favor, inténtelo más tarde.</p>';
    });

// Evento para seleccionar una ciudad
document.addEventListener('click', (event) => {
    if (event.target && event.target.classList.contains('btn-select-city')) {
        const cityId = event.target.getAttribute('data-id');
        localStorage.setItem('selectedCityId', cityId); // Guardar en localStorage
        window.location.href = 'detalle.html'; // Redirigir a la página de detalle
    }
});