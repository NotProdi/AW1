export default function Card({ id, city, price, desc, img }) {
    return `
        <div class="col">
            <div class="card h-100">
                <img src="${img}" class="card-img-top" alt="${city}" />
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center mb-3"> 
                        <h5 class="card-title mb-0">${city}</h5>
                        <p class="price mb-0" style="font-weight: bold;">$${price}</p>
                    </div>
                    <p class="card-text small">${desc}</p> 
                </div>
                <div class="card-footer">
                    <button class="btn btn-primary w-100 btn-select-city" data-id="${id}">Ver más</button>
                </div>
            </div>
        </div>
    `;
}
