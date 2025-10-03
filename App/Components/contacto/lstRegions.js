export class LstRegion extends HTMLElement{
  constructor(){ super(); this.render(); this.load(); window.addEventListener('data-changed',(e)=>{ if(e.detail?.type==='regions') this.load(); }); }
  render(){ this.innerHTML=/*html*/`
  <style rel="stylesheet">@import "./App/Components/contacto/contactoStyle.css";</style>
  <div class="card mt-3"><div class="card-header">Listado de Regiones</div>
  <div class="card-body"><div class="table-responsive">
  <table class="table table-sm table-hover"><thead><tr>
    <th>id</th><th>nombreRegion</th><th>idCountry</th>
  </tr></thead><tbody></tbody></table>
  </div></div></div>`; }
  async load(){ try{
    const r=await fetch('http://localhost:3000/regions'); const data=await r.json();
    const tb=this.querySelector('tbody'); tb.innerHTML='';
    data.forEach(row=>{ const tr=document.createElement('tr'); tr.innerHTML=`<td>${row.id||''}</td><td>${row.nombreRegion||''}</td><td>${row.idCountry||''}</td>`; tb.appendChild(tr); });
  }catch(e){ console.error(e); } }
}
customElements.define("lst-region", LstRegion);
