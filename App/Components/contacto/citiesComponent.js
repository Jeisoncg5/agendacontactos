import './regCities.js';
import './lstCities.js';
// App/Components/contacto/citiesComponent.js
export class CiudadComponent extends HTMLElement {
    constructor() {
        super();
        this.render();
    }


render() {
    this.innerHTML = /* html */ `
    <style rel="stylesheet">
        @import './contactoStyle.css";
    </style>
    <ul class="nav nav-tabs">
    <li class="nav-item">
        <a class="nav-link active mnucontacto" aria-current="page" href="#" data-verocultar='["#regCities",["#lstCities"]]'>Registrar Ciudades</a>
    </li>
    <li class="nav-item">
        <a class="nav-link mnucontacto" href="#" data-verocultar='["#lstCities",["#regCities"]]'>Listado de Ciudades</a>
    </li>
    </ul>
    <div class="container" id="regCities" style="display:block;">
        <reg-cities></reg-cities>
    </div>
    <div class="container" id="lstCities" style="display:none;">
        <lst-cities></lst-cities>
    </div>    
    `;
    this.querySelectorAll(".mnucontacto").forEach((val, id) => {
        val.addEventListener("click", (e)=>{
            let data = JSON.parse(e.target.dataset.verocultar);
            let cardVer = document.querySelector(data[0]);
            cardVer.style.display = 'block';
            data[1].forEach(card => {
                let cardActual = document.querySelector(card);
                cardActual.style.display = 'none';
            });
            e.stopImmediatePropagation();
            e.preventDefault();
        })
    });
}
}



customElements.define("ciudad-component", CiudadComponent);
try{ customElements.define("cities-component", CiudadComponent); }catch(e){}
