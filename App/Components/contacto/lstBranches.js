import { getBranches } from '../../../Apis/contact/branchesApi.js';
export class LstBranches extends HTMLElement{
  constructor(){ super(); this.render(); this.load(); window.addEventListener('data-changed',(e)=>{ if(e.detail?.type==='branches') this.load(); }); }
  render(){ this.innerHTML=/*html*/`
  <style rel="stylesheet">@import "./App/Components/contacto/contactoStyle.css";</style>
  <div class="card mt-3"><div class="card-header">Listado de Branches</div>
  <div class="card-body"><div class="table-responsive">
  <table class="table table-sm table-hover"><thead><tr>
    <th>id</th><th>idCompany</th><th>nombreBranch</th><th>email</th><th>contactName</th><th>phone</th><th>address</th><th>commercialNumber</th>
  </tr></thead><tbody></tbody></table>
  </div></div></div>`; }
  async load(){ try{
    const r=await getBranches();
    if(!r.ok){ this.querySelector('tbody').innerHTML = `<tr><td colspan="8" class="text-danger">No existe colección de branches en db.json</td></tr>`; return; }
    const txt = await r.text();
    let data = []; try{ data = JSON.parse(txt||"[]"); }catch{ data = []; }
    const tb=this.querySelector('tbody'); tb.innerHTML='';
    data.forEach(row=>{ const tr=document.createElement('tr'); tr.innerHTML=`
      <td>${row.id||''}</td><td>${row.idCompany||''}</td><td>${row.nombreBranch||''}</td>
      <td>${row.email||''}</td><td>${row.contactName||''}</td><td>${row.phone||''}</td>
      <td>${row.address||''}</td><td>${row.commercialNumber||''}</td>`; tb.appendChild(tr); });
  }catch(e){ console.error(e); } }
}
customElements.define("lst-branches", LstBranches);
