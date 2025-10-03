import './regBranches.js'; import './lstBranches.js';
export class BranchesComponent extends HTMLElement{
  constructor(){ super(); this.render(); }
  render(){ this.innerHTML=/*html*/`
  <style rel="stylesheet">@import "./App/Components/contacto/contactoStyle.css";</style>
  <ul class="nav nav-tabs">
    <li class="nav-item"><a class="nav-link active mnucontacto" href="#" data-verocultar='["#regBranches",["#lstBranches"]]'>Registrar Branch</a></li>
    <li class="nav-item"><a class="nav-link mnucontacto" href="#" data-verocultar='["#lstBranches",["#regBranches"]]'>Listado Branches</a></li>
  </ul>
  <div class="container" id="regBranches" style="display:block;"><reg-branches></reg-branches></div>
  <div class="container" id="lstBranches" style="display:none;"><lst-branches></lst-branches></div>`;
  this.querySelectorAll(".mnucontacto").forEach(a=>a.addEventListener("click",(e)=>{
    const data = JSON.parse(e.target.dataset.verocultar);
    this.querySelector(data[0]).style.display='block';
    data[1].forEach(sel=> this.querySelector(sel).style.display='none');
    e.preventDefault();
  })); }
}
customElements.define("branches-component", BranchesComponent);
