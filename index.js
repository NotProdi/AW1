// Datos de cotizaciones
const cotizaciones = [
  { tipo: "Dólar Oficial", compra: 970.12, venta: 1020.75 },
  { tipo: "Dólar Blue", compra: 1160.00, venta: 1200.00 },
  { tipo: "Dólar Tarjeta", compra: 0.00, venta: 1375.50 },
  { tipo: "Dólar MEP", compra: 1135.50, venta: 1135.25 }
];

// Formato de moneda
const formatoARG = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS"
});

// Crear tarjetas dinámicamente
function crearTarjetas() {
  const container = document.getElementById("cotizaciones");

  // Función auxiliar para generar filas de cotizaciones
  function generarFila(datos, tipo) {
    return `
      <div class="row">
        ${datos
          .map(
            (cot) => `
          <div class="col-6 d-flex justify-content-start align-items-center">
            <button class="btn cotizacion-boton w-100 p-2 text-start">
              <div class="cotizacion-tipo text-secondary" style="font-size: 0.9em;">${cot.tipo}</div>
              <div class="cotizacion-valor" style="font-size: 1.6em; font-weight: bold; color: #1b5e20;">${formatoARG.format(cot[tipo])}</div>
            </button>
          </div>`
          )
          .join("")}
      </div>
    `;
  }

  // Tarjeta de Compra
  const cardCompra = document.createElement("div");
  cardCompra.classList.add("col-md-6", "mb-1");
  cardCompra.innerHTML = `
    <div class="card shadow-sm">
      <div class="card-body">
        <h5 class="card-title text-center mb-3" style="margin-top: 0;">Cotizaciones de Compra</h5>
        ${generarFila(cotizaciones.slice(0, 2), "compra")}
        ${generarFila(cotizaciones.slice(2), "compra")}
      </div>
    </div>
  `;

  // Tarjeta de Venta
  const cardVenta = document.createElement("div");
  cardVenta.classList.add("col-md-6", "mb-1");
  cardVenta.innerHTML = `
    <div class="card shadow-sm">
      <div class="card-body">
        <h5 class="card-title text-center mb-3" style="margin-top: 0;">Cotizaciones de Venta</h5>
        ${generarFila(cotizaciones.slice(0, 2), "venta")}
        ${generarFila(cotizaciones.slice(2), "venta")}
      </div>
    </div>
  `;

  // Agregar tarjetas al contenedor
  container.appendChild(cardCompra);
  container.appendChild(cardVenta);
}

// Inicializar la página
crearTarjetas();
