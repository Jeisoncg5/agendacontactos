import { postCompanies, patchCompanies, deleteCompanies } from '../../../Apis/contact/companiesApi.js';
import { postCompanies, patchCompanies, deleteCompanies } from '../../../Apis/contact/companiesApi.js';
import CompaniesModel from '../../../Models/companiesModel.js';
export class RegCompanies extends HTMLElement{
  constructor(){ super(); this.render(); this.enabledBtns(); this.bindToolbar(); this.saveData(); this.eventoEditar(); this.eventoEliminar(); this.disableFrm(true); this.loadCountries(); }
  constructor(){ super(); this.render(); this.enabledBtns(); this.bindToolbar(); this.saveData(); this.eventoEditar(); this.eventoEliminar(); this.disableFrm(true); this.loadCountries(); }
  render(){ this.innerHTML=/*html*/`
  <style rel="stylesheet">@import "./App/Components/contacto/contactoStyle.css";</style>
  <div class="card mt-3"><div class="card-header">Registrar Company <span class="badge rounded-pill text-bg-primary" id="idView"></span></div>
  <div class="card mt-3"><div class="card-header">Registrar Company <span class="badge rounded-pill text-bg-primary" id="idView"></span></div>
  <div class="card-body"><form id="frmDataCompanies">
    <div class="row">
      <div class="col"><label class="form-label" for="idCountryC">País</label><select class="form-select" id="idCountryC" name="idCountryC"></select></div>
      <div class="col"><label class="form-label" for="idRegionC">Región</label><select class="form-select" id="idRegionC" name="idRegionC"></select></div>
      <div class="col"><label class="form-label" for="idCity">Ciudad</label><select class="form-select" id="idCity" name="idCity"></select></div>
    </div>
    <div class="row mt-3">
      <div class="col"><label class="form-label" for="nombreCompany">Nombre de la empresa</label><input class="form-control" id="nombreCompany" name="nombreCompany"></div>
      <div class="col"><label class="form-label" for="nit">NIT</label><input class="form-control" id="nit" name="nit"></div>
    </div>
    <div class="row mt-3">
      <div class="col"><label class="form-label" for="email">Email</label><input class="form-control" id="email" name="email" type="email"></div>
      <div class="col"><label class="form-label" for="address">Address</label><input class="form-control" id="address" name="address"></div>
    </div>
    <div class="row mt-3"><div class="col"><div class="container mt-4 text-center">
      <a href="#" class="btn btn-primary"  id="btnNuevo"    data-ed='[["#btnGuardar","#btnCancelar"],["#btnNuevo","#btnEditar","#btnEliminar"]]'>Nuevo</a>
      <a href="#" class="btn btn-dark "    id="btnCancelar" data-ed='[["#btnNuevo"],["#btnGuardar","#btnEditar","#btnEliminar","#btnCancelar"]]'>Cancelar</a>
      <a href="#" class="btn btn-success"  id="btnGuardar"  data-ed='[["#btnEditar","#btnCancelar","#btnNuevo","#btnEliminar"],["#btnGuardar"]]'>Guardar</a>
      <a href="#" class="btn btn-warning"  id="btnEditar"   data-ed='[[],[]]'>Editar</a>
      <a href="#" class="btn btn-danger"   id="btnEliminar" data-ed='[["#btnNuevo"],["#btnGuardar","#btnEditar","#btnEliminar","#btnCancelar"]]'>Eliminar</a>
    </div></div></div>
    <div class="row">
      <div class="col"><label class="form-label" for="idCountryC">País</label><select class="form-select" id="idCountryC" name="idCountryC"></select></div>
      <div class="col"><label class="form-label" for="idRegionC">Región</label><select class="form-select" id="idRegionC" name="idRegionC"></select></div>
      <div class="col"><label class="form-label" for="idCity">Ciudad</label><select class="form-select" id="idCity" name="idCity"></select></div>
    </div>
    <div class="row mt-3">
      <div class="col"><label class="form-label" for="nombreCompany">Nombre de la empresa</label><input class="form-control" id="nombreCompany" name="nombreCompany"></div>
      <div class="col"><label class="form-label" for="nit">NIT</label><input class="form-control" id="nit" name="nit"></div>
    </div>
    <div class="row mt-3">
      <div class="col"><label class="form-label" for="email">Email</label><input class="form-control" id="email" name="email" type="email"></div>
      <div class="col"><label class="form-label" for="address">Address</label><input class="form-control" id="address" name="address"></div>
    </div>
    <div class="row mt-3"><div class="col"><div class="container mt-4 text-center">
      <a href="#" class="btn btn-primary"  id="btnNuevo"    data-ed='[["#btnGuardar","#btnCancelar"],["#btnNuevo","#btnEditar","#btnEliminar"]]'>Nuevo</a>
      <a href="#" class="btn btn-dark "    id="btnCancelar" data-ed='[["#btnNuevo"],["#btnGuardar","#btnEditar","#btnEliminar","#btnCancelar"]]'>Cancelar</a>
      <a href="#" class="btn btn-success"  id="btnGuardar"  data-ed='[["#btnEditar","#btnCancelar","#btnNuevo","#btnEliminar"],["#btnGuardar"]]'>Guardar</a>
      <a href="#" class="btn btn-warning"  id="btnEditar"   data-ed='[[],[]]'>Editar</a>
      <a href="#" class="btn btn-danger"   id="btnEliminar" data-ed='[["#btnNuevo"],["#btnGuardar","#btnEditar","#btnEliminar","#btnCancelar"]]'>Eliminar</a>
    </div></div></div>
  </form></div></div>`; }
  bindToolbar(){ this.querySelector("#btnNuevo").addEventListener("click",(e)=>{ this.ctrlBtn(e.target.dataset.ed); this.resetIdView(); this.disableFrm(false); e.preventDefault(); 
      this.loadCountries();});
    this.querySelector("#btnCancelar").addEventListener("click",(e)=>{ this.ctrlBtn(e.target.dataset.ed); this.resetIdView(); this.disableFrm(true); this.loadCountries(); e.preventDefault(); }); }
  resetIdView = () => { const idView=this.querySelector('#idView'); idView.innerHTML=''; }
  ctrlBtn = (json) => { const data = JSON.parse(json); data[0].forEach(sel => { const b=this.querySelector(sel); if(b) b.classList.remove('disabled'); }); data[1].forEach(sel => { const b=this.querySelector(sel); if(b) b.classList.add('disabled'); }); }
  enabledBtns = () => { this.querySelectorAll(".btn").forEach((val)=>{ this.ctrlBtn(val.dataset.ed); }); }
  saveData = () => { const frm=this.querySelector('#frmDataCompanies');
    this.querySelector('#btnGuardar').addEventListener('click', async (e)=>{
      e.preventDefault();
      const datos = Object.fromEntries(new FormData(frm).entries());
      const required=['idCity','nombreCompany','nit','email','address']; for(const k of required){ if(!datos[k]){ alert('Todos los campos son obligatorios'); return; } }
      const r = await postCompanies(datos); if(!r.ok){ const t=await r.text().catch(()=> ''); alert(`No se pudo guardar (HTTP ${r.status}). ${t}`); return; }
      const data = await r.json(); this.viewData(data.id); window.dispatchEvent(new CustomEvent('data-changed',{detail:{type:'companies'}})); this.disableFrm(true); this.ctrlBtn(this.querySelector('#btnGuardar').dataset.ed);
    }); }
  eventoEditar = () => { this.querySelector('#btnEditar').addEventListener('click', async (e)=>{
    e.preventDefault(); const id=this.querySelector('#idView').textContent; if(!id){ alert('No hay registro seleccionado'); return; }
    const frm=this.querySelector('#frmDataCompanies'); const datos=Object.fromEntries(new FormData(frm).entries());
    const r=await patchCompanies(id, datos); if(!r.ok){ alert('No se pudo editar'); return; } window.dispatchEvent(new CustomEvent('data-changed',{detail:{type:'companies'}}));
  }); }
  eventoEliminar = () => { this.querySelector('#btnEliminar').addEventListener('click', async (e)=>{
    e.preventDefault(); const id=this.querySelector('#idView').textContent; if(!id){ alert('No hay registro seleccionado'); return; }
    const r=await deleteCompanies(id); if(!r.ok){ alert('No se pudo eliminar'); return; } this.resetIdView(); this.disableFrm(true); this.loadCountries(); window.dispatchEvent(new CustomEvent('data-changed',{detail:{type:'companies'}})); this.ctrlBtn(e.target.dataset.ed);
  }); }
  viewData = (id) => { const idView=this.querySelector('#idView'); idView.innerHTML=id; }
  disableFrm = (estado) => { const frm=this.querySelector('#frmDataCompanies'); if(!frm) return;
    const defaults={ idCountryC:'', idRegionC:'', idCity:'', nombreCompany:'', nit:'', email:'', address:'' };
    Object.keys(defaults).forEach(k=>{ const el=frm.elements[k]; if(el){ if(estado) el.value=defaults[k]; el.disabled=estado; } });
  }
  async loadCountries(){ try{
    const r=await fetch('http://localhost:3000/countries'); const data=await r.json();
    const selC=this.querySelector('#idCountryC'); const selR=this.querySelector('#idRegionC'); const selCi=this.querySelector('#idCity');
    selC.innerHTML=''; selR.innerHTML=''; selCi.innerHTML=''; if(!data.length){ selC.disabled=true; selR.disabled=true; selCi.disabled=true; return; }
    data.forEach(c=>{ const o=document.createElement('option'); o.value=c.id; o.textContent=c.nombreCountry; selC.appendChild(o); });
    selC.disabled=false; await this.loadRegions(selC.value); await this.loadCities(selC.value, this.querySelector('#idRegionC').value);
    selC.onchange = async (e)=>{ await this.loadRegions(e.target.value); await this.loadCities(e.target.value, this.querySelector('#idRegionC').value); };
    this.querySelector('#idRegionC').onchange = async (e)=>{ await this.loadCities(selC.value, e.target.value); };
  }catch(e){ console.error(e); } }
  async loadRegions(countryId){ try{
    const r=await fetch(`http://localhost:3000/regions?idCountry=${countryId}`); const regs=await r.json();
    const selR=this.querySelector('#idRegionC'); selR.innerHTML=''; if(!regs.length){ selR.disabled=true; return; }
    regs.forEach(rg=>{ const o=document.createElement('option'); o.value=rg.id; o.textContent=rg.nombreRegion; selR.appendChild(o); }); selR.disabled=false;
  }catch(e){ console.error(e); } }
  async loadCities(countryId, regionId){ try{
    let url=`http://localhost:3000/cities?idCountry=${countryId}`; if(regionId) url+=`&idRegion=${regionId}`;
    const r=await fetch(url); const cs=await r.json();
    const selCi=this.querySelector('#idCity'); selCi.innerHTML=''; if(!cs.length){ selCi.disabled=true; return; }
    cs.forEach(c=>{ const o=document.createElement('option'); o.value=c.id; o.textContent=c.nombreCity; selCi.appendChild(o); }); selCi.disabled=false;
  }catch(e){ console.error(e); } }
}
customElements.define("reg-companies", RegCompanies);
