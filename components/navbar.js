
const navElements = [

    {title:"Inicio", link: `./home.html`},
    {title:"Gorras", link: `./gorras.html`},
    {title:"Zapatillas", link: `./zapatillas.html`},
    {title:"Chombas", link: `./chombas.html`},
]

export const navbarComponent = `
    <nav class="navbar bg-light bg-gradient navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a href="home.html" class="navbar-brand text-light" style="--bs-text-opacity: .8;">
                <img src="/assets/MonogramChicM-T.webp" alt="Logo" width="40" height="35" class="d-inline-block align-text-top ">
                MT Streetwear
            </a>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollpase" aria-controls="navbarCollpase" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarCollpase">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a href="home.html" class="nav-link active"></a>
                    </li>
                    ${navElements.map(e => {
                        return `
                            <li class="nav-item">
                                <a class="nav-link" href=${e.link}>${e.title}</a>
                            </li>
                        `;
                    }).join("")}
                </ul>

                <div class="ms-auto">
                    <div class="btn btn-dark ms-auto">
                        <a href="carrito.html">
                            <i class="bi bi-cart"></i>
                        </a>
                    </div>
                    <div id="btnLogOut" class="btn btn-danger ms-auto">
                        <i class="bi bi-box-arrow-left"></i>
                    </div>
                </div>
            </div>
        </div>
    </nav>
`