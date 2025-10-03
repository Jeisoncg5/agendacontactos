import { postBranches, patchBranches, deleteBranches } from '../../../Apis/contact/branchesApi.js';
import { postBranches, patchBranches, deleteBranches } from '../../../Apis/contact/branchesApi.js';
import BranchesModel from '../../../Models/branchesModel.js';
export class RegBranches extends HTMLElement{
  constructor(){ super(); this.render(); this.enabledBtns(); this.bindToolbar(); this.saveData(); this.eventoEditar(); this.eventoEliminar(); this.disableFrm(true); this.loadCompanies(); }
  constructor(){ super(); this.render(); this.enabledBtns(); this.bindToolbar(); this.saveData(); this.eventoEditar(); this.eventoEliminar(); this.disableFrm(true); this.loadCompanies(); }
  render(){ this.innerHTML=/*html*/`
  <style rel="stylesheet">@import "./App/Components/contacto/contactoStyle.css";</style>
  <div class="card mt-3"><div class="card-header">Registrar Branch <span class="badge rounded-pill text-bg-primary" id="idView"></span></div>
  <div class="card mt-3"><div class="card-header">Registrar Branch <span class="badge rounded-pill text-bg-primary" id="idView"></span></div>
  <div class="card-body"><form id="frmDataBranches">
    <div class="row">
      <div class="col"><label class="form-label" for="idCompany">Company</label><select class="form-select" id="idCompany" name="idCompany"></select></div>
      <div class="col"><label class="form-label" for="nombreBranch">Nombre Branch</label><input class="form-control" id="nombreBranch" name="nombreBranch"></div>
    </div>
    <div class="row mt-3">
      <div class="col"><label class="form-label" for="email">Email</label><input class="form-control" id="email" name="email" type="email"></div>
      <div class="col"><label class="form-label" for="contactName">Contact Name</label><input class="form-control" id="contactName" name="contactName"></div>
    </div>
    <div class="row mt-3">
      <div class="col"><label class="form-label" for="phone">Phone</label><input class="form-control" id="phone" name="phone"></div>
      <div class="col"><label class="form-label" for="address">Address</label><input class="form-control" id="address" name="address"></div>
    </div>
    <div class="row mt-3">
      <div class="col"><label class="form-label" for="commercialNumber">Number Comercial</label><input class="form-control" id="commercialNumber" name="commercialNumber"></div>
    </div>
    <div class="row mt-3"><div class="col"><div class="container mt-4 text-center">
      <a href="#" class="btn btn-primary"  id="btnNuevo"    data-ed='[["#btnGuardar","#btnCancelar"],["#btnNuevo","#btnEditar","#btnEliminar"]]'>Nuevo</a>
      <a href="#" class="btn btn-dark "    id="btnCancelar" data-ed='[["#btnNuevo"],["#btnGuardar","#btnEditar","#btnEliminar","#btnCancelar"]]'>Cancelar</a>
      <a href="#" class="btn btn-success"  id="btnGuardar"  data-ed='[["#btnEditar","#btnCancelar","#btnNuevo","#btnEliminar"],["#btnGuardar"]]'>Guardar</a>
      <a href="#" class="btn btn-warning"  id="btnEditar"   data-ed='[[],[]]'>Editar</a>
      <a href="#" class="btn btn-danger"   id="btnEliminar" data-ed='[["#btnNuevo"],["#btnGuardar","#btnEditar","#btnEliminar","#btnCancelar"]]'>Eliminar</a>
    </div></div></div>
    <div class="row">
      <div class="col"><label class="form-label" for="idCompany">Company</label><select class="form-select" id="idCompany" name="idCompany"></select></div>
      <div class="col"><label class="form-label" for="nombreBranch">Nombre Branch</label><input class="form-control" id="nombreBranch" name="nombreBranch"></div>
    </div>
    <div class="row mt-3">
      <div class="col"><label class="form-label" for="email">Email</label><input class="form-control" id="email" name="email" type="email"></div>
      <div class="col"><label class="form-label" for="contactName">Contact Name</label><input class="form-control" id="contactName" name="contactName"></div>
    </div>
    <div class="row mt-3">
      <div class="col"><label class="form-label" for="phone">Phone</label><input class="form-control" id="phone" name="phone"></div>
      <div class="col"><label class="form-label" for="address">Address</label><input class="form-control" id="address" name="address"></div>
    </div>
    <div class="row mt-3">
      <div class="col"><label class="form-label" for="commercialNumber">Number Comercial</label><input class="form-control" id="commercialNumber" name="commercialNumber"></div>
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
      this.loadCompanies();});
    this.querySelector("#btnCancelar").addEventListener("click",(e)=>{ this.ctrlBtn(e.target.dataset.ed); this.resetIdView(); this.disableFrm(true); this.loadCompanies(); e.preventDefault(); }); }
  resetIdView = () => { const idView=this.querySelector('#idView'); idView.innerHTML=''; }
  ctrlBtn = (json) => { const data = JSON.parse(json); data[0].forEach(sel => { const b=this.querySelector(sel); if(b) b.classList.remove('disabled'); }); data[1].forEach(sel => { const b=this.querySelector(sel); if(b) b.classList.add('disabled'); }); }
  enabledBtns = () => { this.querySelectorAll(".btn").forEach((val)=>{ this.ctrlBtn(val.dataset.ed); }); }
  saveData = () => { const frm=this.querySelector('#frmDataBranches');
    this.querySelector('#btnGuardar').addEventListener('click', async (e)=>{
      e.preventDefault();
      const datos = Object.fromEntries(new FormData(frm).entries());
      const required=['idCompany','nombreBranch','email','contactName','phone','address','commercialNumber']; for(const k of required){ if(!datos[k]){ alert('Todos los campos son obligatorios'); return; } }
      const r = await postBranches(datos); if(!r.ok){ alert('No se pudo guardar'); return; }
      const data = await r.json(); this.viewData(data.id); window.dispatchEvent(new CustomEvent('data-changed',{detail:{type:'branches'}})); this.disableFrm(true); this.ctrlBtn(this.querySelector('#btnGuardar').dataset.ed);
    }); }
  eventoEditar = () => { this.querySelector('#btnEditar').addEventListener('click', async (e)=>{
    e.preventDefault(); const id=this.querySelector('#idView').textContent; if(!id){ alert('No hay registro seleccionado'); return; }
    const frm=this.querySelector('#frmDataBranches'); const datos=Object.fromEntries(new FormData(frm).entries());
    const r=await patchBranches(id, datos); if(!r.ok){ alert('No se pudo editar'); return; } window.dispatchEvent(new CustomEvent('data-changed',{detail:{type:'branches'}}));
  }); }
  eventoEliminar = () => { this.querySelector('#btnEliminar').addEventListener('click', async (e)=>{
    e.preventDefault(); const id=this.querySelector('#idView').textContent; if(!id){ alert('No hay registro seleccionado'); return; }
    const r=await deleteBranches(id); if(!r.ok){ alert('No se pudo eliminar'); return; } this.resetIdView(); this.disableFrm(true); this.loadCompanies(); window.dispatchEvent(new CustomEvent('data-changed',{detail:{type:'branches'}})); this.ctrlBtn(e.target.dataset.ed);
  }); }
  viewData = (id) => { const idView=this.querySelector('#idView'); idView.innerHTML=id; }
  disableFrm = (estado) => { const frm=this.querySelector('#frmDataBranches'); if(!frm) return;
    const defaults={ idCompany:'', nombreBranch:'', email:'', contactName:'', phone:'', address:'', commercialNumber:'' };
    Object.keys(defaults).forEach(k=>{ const el=frm.elements[k]; if(el){ if(estado) el.value=defaults[k]; el.disabled=estado; } });
  }
  async loadCompanies(){ try{
    const r=await fetch('http://localhost:3000/companies'); const cs=await r.json();
    const sel=this.querySelector('#idCompany'); sel.innerHTML=''; if(!cs.length){ sel.disabled=true; this.querySelector('#btnGuardar').disabled=true; return; }
    cs.forEach(c=>{ const o=document.createElement('option'); o.value=c.id; o.textContent=c.nombreCompany; sel.appendChild(o); });
    sel.disabled=false; this.querySelector('#btnGuardar').disabled=false;
  }catch(e){ console.error(e); } }
      const datos = Object.fromEntries(new FormData(frm).entries());
      const required=['idCompany','nombreBranch','email','contactName','phone','address','commercialNumber']; for(const k of required){ if(!datos[k]){ alert('Todos los campos son obligatorios'); return; } }
      const r = await postBranches(datos); if(!r.ok){ alert('No se pudo guardar'); return; }
      const data = await r.json(); this.viewData(data.id); window.dispatchEvent(new CustomEvent('data-changed',{detail:{type:'branches'}})); this.disableFrm(true); this.ctrlBtn(this.querySelector('#btnGuardar').dataset.ed);
    }); }
  eventoEditar = () => { this.querySelector('#btnEditar').addEventListener('click', async (e)=>{
    e.preventDefault(); const id=this.querySelector('#idView').textContent; if(!id){ alert('No hay registro seleccionado'); return; }
    const frm=this.querySelector('#frmDataBranches'); const datos=Object.fromEntries(new FormData(frm).entries());
    const r=await patchBranches(id, datos); if(!r.ok){ alert('No se pudo editar'); return; } window.dispatchEvent(new CustomEvent('data-changed',{detail:{type:'branches'}}));
  }); }
  eventoEliminar = () => { this.querySelector('#btnEliminar').addEventListener('click', async (e)=>{
    e.preventDefault(); const id=this.querySelector('#idView').textContent; if(!id){ alert('No hay registro seleccionado'); return; }
    const r=await deleteBranches(id); if(!r.ok){ alert('No se pudo eliminar'); return; } this.resetIdView(); this.disableFrm(true); this.loadCompanies(); window.dispatchEvent(new CustomEvent('data-changed',{detail:{type:'branches'}})); this.ctrlBtn(e.target.dataset.ed);
  }); }
  viewData = (id) => { const idView=this.querySelector('#idView'); idView.innerHTML=id; }
  disableFrm = (estado) => { const frm=this.querySelector('#frmDataBranches'); if(!frm) return;
    const defaults={ idCompany:'', nombreBranch:'', email:'', contactName:'', phone:'', address:'', commercialNumber:'' };
    Object.keys(defaults).forEach(k=>{ const el=frm.elements[k]; if(el){ if(estado) el.value=defaults[k]; el.disabled=estado; } });
  }
  async loadCompanies(){ try{
    const r=await fetch('http://localhost:3000/companies'); const cs=await r.json();
    const sel=this.querySelector('#idCompany'); sel.innerHTML=''; if(!cs.length){ sel.disabled=true; this.querySelector('#btnGuardar').disabled=true; return; }
    cs.forEach(c=>{ const o=document.createElement('option'); o.value=c.id; o.textContent=c.nombreCompany; sel.appendChild(o); });
    sel.disabled=false; this.querySelector('#btnGuardar').disabled=false;
  }catch(e){ console.error(e); } }
}
customElements.define("reg-branches", RegBranches);
