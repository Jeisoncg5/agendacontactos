import './regRegions.js';
import './lstRegions.js';
export class RegionsComponent extends HTMLElement {
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
        <a class="nav-link active mnucontacto" aria-current="page" href="#" data-verocultar='["#regRegions",["#lstRegions"]]'>Registrar Regiones</a>
    </li>
    <li class="nav-item">
        <a class="nav-link mnucontacto" href="#" data-verocultar='["#lstRegions",["#regRegions"]]'>Listado de Regiones</a>
    </li>
    </ul>
    <div class="container" id="regRegions" style="display:block;">
        <reg-regions></reg-regions>
    </div>
    <div class="container" id="lstRegions" style="display:none;">
        <lst-region></lst-region>
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



customElements.define("regions-component", RegionsComponent);