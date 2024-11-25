// /components/card.js
export default function Card({ imagen, titulo, precio, descripcion, id }) {
    return `
        <div class="col">
            <div class="card">
                <img src="${imagen}" class="card-img-top" alt="${titulo}">
                <div class="card-body">
                    <h5 class="card-title">${titulo}</h5>
                    <p class="card-text">${descripcion}</p>
                </div>
                <div class="card-footer d-flex justify-content-between align-items-center">
                    <p class="price mb-0 text-start" style="font-weight: bold;">$${precio}</p>
                    <input type="number" class="form-control numericUpDown" style="width: 60px;" min="1" max="10" placeholder="0" step="1" />
                    <button id="btnAgregar" class="btn btn-success" data-product-id="${id}">Agregar</button>
                </div>
            </div>
        </div>
    `;
}
