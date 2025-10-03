import './regCompanies.js'; import './lstCompanies.js';
export class CompaniesComponent extends HTMLElement{
  constructor(){ super(); this.render(); }
  render(){ this.innerHTML=/*html*/`
  <style rel="stylesheet">@import "./App/Components/contacto/contactoStyle.css";</style>
  <ul class="nav nav-tabs">
    <li class="nav-item"><a class="nav-link active mnucontacto" href="#" data-verocultar='["#regCompanies",["#lstCompanies"]]'>Registrar Company</a></li>
    <li class="nav-item"><a class="nav-link mnucontacto" href="#" data-verocultar='["#lstCompanies",["#regCompanies"]]'>Listado Companies</a></li>
  </ul>
  <div class="container" id="regCompanies" style="display:block;"><reg-companies></reg-companies></div>
  <div class="container" id="lstCompanies" style="display:none;"><lst-companies></lst-companies></div>`;
  this.querySelectorAll(".mnucontacto").forEach(a=>a.addEventListener("click",(e)=>{
    const data = JSON.parse(e.target.dataset.verocultar);
    this.querySelector(data[0]).style.display='block';
    data[1].forEach(sel=> this.querySelector(sel).style.display='none');
    e.preventDefault();
  })); }
}
customElements.define("companies-component", CompaniesComponent);