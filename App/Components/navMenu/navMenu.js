// App/Components/navMenu/navMenu.js
export class NavMenu extends HTMLElement{
  connectedCallback(){
    this.innerHTML = /* html */ `
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Navbar</a>
          <div class="collapse navbar-collapse" id="navDemo">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item"><a class="nav-link active" href="#" data-verocultar='["c"]'>Countries</a></li>
              <li class="nav-item"><a class="nav-link" href="#" data-verocultar='["rg"]'>Regions</a></li>
              <li class="nav-item"><a class="nav-link" href="#" data-verocultar='["ct"]'>Cities</a></li>
              <li class="nav-item"><a class="nav-link" href="#" data-verocultar='["cp"]'>Companies</a></li>
              <li class="nav-item"><a class="nav-link" href="#" data-verocultar='["bc"]'>Branches</a></li>
              <li class="nav-item"><a class="nav-link disabled" aria-disabled="true">Disabled</a></li>
            </ul>
          </div>
        </div>
      </nav>
    `;

    this.querySelectorAll(".nav-link:not(.disabled)").forEach((val) => {
      val.addEventListener("click", (e)=>{
        e.preventDefault();
        e.stopImmediatePropagation();

        const raw = e.currentTarget.dataset.verocultar;
        if (!raw) return console.warn('Sin data-verocultar en el link');

        let data;
        try { data = JSON.parse(raw); }
        catch { return console.error('data-verocultar no es JSON válido:', raw); }

        const mainContent = document.querySelector('#mainContent');
        if (!mainContent) return console.error('#mainContent no existe en el DOM');

        mainContent.innerHTML = "";

        switch (data[0]) {
          case 'c':
            mainContent.innerHTML = "<contacto-component></contacto-component>";
            break;
          case 'rg':
            mainContent.innerHTML = "<regions-component></regions-component>";
            break;
          case 'ct':
            mainContent.innerHTML = "<ciudad-component></ciudad-component>";
            break;
          case 'cp':
            mainContent.innerHTML = "<companies-component></companies-component>";
            break;
          case 'bc':
            mainContent.innerHTML = "<branches-component></branches-component>";
            break;
          default:
            console.warn('Código no mapeado:', data[0]);
        }
      });
    });
  }
}
customElements.define("nav-menu", NavMenu);
