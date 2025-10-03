import { postCompanies } from '../../../Apis/contact/companiesApi.js';
import CompaniesModel from '../../../Models/companiesModel.js';
export class RegCompanies extends HTMLElement{
  constructor(){ super(); this.render(); this.saveData(); this.disableFrm(false); }
  render(){ this.innerHTML=/*html*/`
  <style rel="stylesheet">@import "./App/Components/contacto/contactoStyle.css";</style>
  <div class="card mt-3"><div class="card-header">Registrar Company</div>
  <div class="card-body"><form id="frmDataCompanies">
    <div class="row"><div class="col">
      <label class="form-label" for="nombreCompany">Nombre de la empresa</label>
      <input class="form-control" id="nombreCompany" name="nombreCompany">
    </div><div class="col">
      <label class="form-label" for="nit">NIT</label>
      <input class="form-control" id="nit" name="nit">
    </div></div>
    <div class="row mt-3"><div class="col">
      <label class="form-label" for="email">Email</label>
      <input class="form-control" id="email" name="email" type="email">
    </div><div class="col">
      <label class="form-label" for="address">Address</label>
      <input class="form-control" id="address" name="address">
    </div></div>
    <div class="row mt-3"><div class="col text-center">
      <button class="btn btn-primary" id="btnGuardar">Guardar</button>
    </div></div>
  </form></div></div>`; }
  saveData(){ const frm=this.querySelector('#frmDataCompanies');
    this.querySelector('#btnGuardar').addEventListener('click', async (e)=>{
      e.preventDefault();
      const datos=Object.fromEntries(new FormData(frm).entries());
      if(!datos.nombreCompany || !datos.nit || !datos.email || !datos.address){ alert('Todos los campos son obligatorios'); return; }
      const r=await postCompanies(datos);
      if(r.ok){ alert('Company creada'); frm.reset(); window.dispatchEvent(new CustomEvent('data-changed',{detail:{type:'companies'}})); }
    });
  }
  disableFrm(flag){ const frm=this.querySelector('#frmDataCompanies'); if(!frm) return; [...frm.elements].forEach(el=>{ if(el.name) el.disabled=flag; }); }
}
customElements.define("reg-companies", RegCompanies);
