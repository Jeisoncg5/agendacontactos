import { postBranches } from '../../../Apis/contact/branchesApi.js';
import BranchesModel from '../../../Models/branchesModel.js';
export class RegBranches extends HTMLElement{
  constructor(){ super(); this.render(); this.loadCompanies(); this.saveData(); }
  render(){ this.innerHTML=/*html*/`
  <style rel="stylesheet">@import "./App/Components/contacto/contactoStyle.css";</style>
  <div class="card mt-3"><div class="card-header">Registrar Branch</div>
  <div class="card-body"><form id="frmDataBranches">
    <div class="row"><div class="col">
      <label class="form-label" for="idCompany">Company</label>
      <select class="form-select" id="idCompany" name="idCompany"></select>
    </div><div class="col">
      <label class="form-label" for="nombreBranch">Nombre Branch</label>
      <input class="form-control" id="nombreBranch" name="nombreBranch">
    </div></div>
    <div class="row mt-3"><div class="col">
      <label class="form-label" for="email">Email</label>
      <input class="form-control" id="email" name="email" type="email">
    </div><div class="col">
      <label class="form-label" for="contactName">Contact Name</label>
      <input class="form-control" id="contactName" name="contactName">
    </div></div>
    <div class="row mt-3"><div class="col">
      <label class="form-label" for="phone">Phone</label>
      <input class="form-control" id="phone" name="phone">
    </div><div class="col">
      <label class="form-label" for="address">Address</label>
      <input class="form-control" id="address" name="address">
    </div></div>
    <div class="row mt-3"><div class="col">
      <label class="form-label" for="commercialNumber">Number Comercial</label>
      <input class="form-control" id="commercialNumber" name="commercialNumber">
    </div></div>
    <div class="row mt-3"><div class="col text-center">
      <button class="btn btn-primary" id="btnGuardar">Guardar</button>
    </div></div>
  </form></div></div>`; }
  async loadCompanies(){
    try{
      const r = await fetch('http://localhost:3000/companies'); const cs = await r.json();
      const sel=this.querySelector('#idCompany'); sel.innerHTML='';
      if(!cs.length){ sel.disabled=true; this.querySelector('#btnGuardar').disabled=true; }
      else { cs.forEach(c=>{ const o=document.createElement('option'); o.value=c.id; o.textContent=c.nombreCompany; sel.appendChild(o); }); sel.disabled=false; this.querySelector('#btnGuardar').disabled=false; }
    }catch(e){ console.error(e); }
  }
  saveData(){ const frm=this.querySelector('#frmDataBranches');
    this.querySelector('#btnGuardar').addEventListener('click', async (e)=>{
      e.preventDefault();
      const datos=Object.fromEntries(new FormData(frm).entries());
      const required=['idCompany','nombreBranch','email','contactName','phone','address','commercialNumber'];
      for(const k of required){ if(!datos[k]){ alert('Todos los campos son obligatorios'); return; } }
      const r=await postBranches(datos);
      if(r.ok){ alert('Branch creada'); frm.reset(); window.dispatchEvent(new CustomEvent('data-changed',{detail:{type:'branches'}})); }
    });
  }
}
customElements.define("reg-branches", RegBranches);
