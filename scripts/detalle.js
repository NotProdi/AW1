// Obtener el ID de la ciudad seleccionada desde LocalStorage
const cityId = localStorage.getItem("selectedCityId");

if (!cityId) {
    console.error("No hay ID de ciudad en LocalStorage");
    document.getElementById("city-description").innerHTML =
        `<p class="text-center text-danger">No se encontró la ciudad seleccionada.</p>`;
} else {
    console.log("ID de ciudad seleccionada:", cityId);
}




// Elementos del DOM
const cityTitle = document.getElementById("calculate-title");
const cityImage = document.getElementById("city-image");
const cityDescription = document.getElementById("city-description");
const hotelSelect = document.getElementById("hotel");
const numPeopleInput = document.getElementById("num-people");
const numNightsInput = document.getElementById("num-nights");
const totalPriceElement = document.getElementById("total-price");
const reserveButton = document.getElementById("reserve-button");

// Cargar datos de la ciudad seleccionada desde el JSON
fetch("../data/ciudades.json")
    .then(response => {
        if (!response.ok) throw new Error("Error al cargar el archivo JSON");
        return response.json();
    })
    .then(cities => {
        const city = cities.find(city => city.id == cityId);
        if (city) {
            cityTitle.textContent = city.city;
            cityImage.src = city.img;
            cityDescription.innerHTML = `<p>${city.desc || ""}</p>`;


            // Llenar opciones de hoteles
            city.hotels.forEach(hotel => {
                const option = document.createElement("option");
                option.value = hotel.name;
                option.textContent = `${hotel.name} - $${hotel.price} por noche`;
                hotelSelect.appendChild(option);
            });

            // Calcular el precio total cuando cambien los valores
            function calculateTotalPrice() {
                const selectedHotel = city.hotels.find(hotel => hotel.name === hotelSelect.value);
                const numPeople = parseInt(numPeopleInput.value) || 1;
                const numNights = parseInt(numNightsInput.value) || 1;

                if (selectedHotel) {
                    const totalPrice = selectedHotel.price * numNights * numPeople;
                    totalPriceElement.textContent = `$${totalPrice}`;
                }
            }

            hotelSelect.addEventListener("change", calculateTotalPrice);
            numPeopleInput.addEventListener("input", calculateTotalPrice);
            numNightsInput.addEventListener("input", calculateTotalPrice);

            // Guardar en LocalStorage y redirigir a resumen
            reserveButton.addEventListener("click", (event) => {
                event.preventDefault(); // Evita cualquier comportamiento no deseado
            
                const selectedHotel = hotelSelect.value;
                const numPeople = numPeopleInput.value;
                const numNights = numNightsInput.value;
                const totalPrice = totalPriceElement.textContent.replace("$", "");
            
                if (!selectedHotel || !numPeople || !numNights) {
                    alert("Por favor, completa todos los campos.");
                    return;
                }
            
                localStorage.setItem("selectedHotel", selectedHotel);
                localStorage.setItem("numPeople", numPeople);
                localStorage.setItem("numNights", numNights);
                localStorage.setItem("totalPrice", totalPrice);
            
                window.location.href = "../pages/resumen.html";
            });

        } else {
            cityDescription.innerHTML = `<p class="text-center text-danger">Ciudad no encontrada.</p>`;
        }
    })
    .catch(error => {
        console.error("Error cargando las ciudades:", error);
        cityDescription.innerHTML = `<p class="text-center text-danger">Ocurrió un error al cargar los detalles. Por favor, inténtelo más tarde.</p>`;
    });
