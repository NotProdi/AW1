document.addEventListener("DOMContentLoaded", () => {
    // Recuperar datos del LocalStorage
    const cityId = localStorage.getItem("selectedCityId");
    const numPeople = localStorage.getItem("numPeople");
    const numNights = localStorage.getItem("numNights");
    const selectedHotel = localStorage.getItem("selectedHotel");
    const totalPrice = localStorage.getItem("totalPrice");

    // Elementos del DOM (coinciden con los de detalle.js)
    const destinationTitle = document.getElementById("destination-title");
    const destinationImage = document.getElementById("destination-image");
    const destinationDescription = document.getElementById("destination-description");

    if (!cityId) {
        console.error("No se encontró el ID de la ciudad en localStorage.");
        destinationDescription.innerHTML =
            '<p class="text-center text-danger">No se encontró la ciudad seleccionada.</p>';
        return;
    }

    fetch("../data/ciudades.json")
        .then(response => response.json())
        .then(cities => {
            console.log("Ciudades cargadas:", cities);
            const city = cities.find(c => c.id == cityId);

            if (city) {
                destinationTitle.textContent = `Viaje a ${city.city}`;
                destinationImage.src = city.img;
                destinationDescription.innerHTML = `
                <p>Hotel: ${selectedHotel}</p>
                <p>Número de personas: ${numPeople}</p>
                <p>Noches: ${numNights}</p>
                <p><strong>Total: $${totalPrice}</strong></p>
            `;
            
            } else {
                destinationDescription.innerHTML =
                    '<p class="text-center text-danger">Ciudad no encontrada.</p>';
            }
        })
        .catch(error => {
            console.error("Error cargando las ciudades:", error);
            destinationDescription.innerHTML =
                '<p class="text-center text-danger">Error al cargar los detalles.</p>';
        });
});

// Función para cancelar la reserva
function cancelBooking() {
    if (confirm("¿Estás seguro de que quieres cancelar la reserva?")) {
        localStorage.removeItem("selectedCityId");
        localStorage.removeItem("selectedHotel");
        localStorage.removeItem("numPeople");
        localStorage.removeItem("numNights");
        localStorage.removeItem("totalPrice");
        window.location.href = "../pages/home.html";
    }
}

// Manejar envío del formulario
document.getElementById("user-info-form").addEventListener("submit", (event) => {
    event.preventDefault();

    // Limpiar los campos del formulario
    document.getElementById("first-name").value = "";
    document.getElementById("last-name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";

    alert("¡Gracias por tu reserva! Estamos procesando tu solicitud.");
});
