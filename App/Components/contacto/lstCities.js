export class LstCities extends HTMLElement{
  constructor(){ super(); this.render(); this.load(); window.addEventListener('data-changed',(e)=>{ if(e.detail?.type==='cities') this.load(); }); }
  render(){ this.innerHTML=/*html*/`
  <style rel="stylesheet">@import "./App/Components/contacto/contactoStyle.css";</style>
  <div class="card mt-3"><div class="card-header">Listado de Cities</div>
  <div class="card-body"><div class="table-responsive">
  <table class="table table-sm table-hover"><thead><tr>
    <th>id</th><th>nombreCity</th><th>idCountry</th><th>idRegion</th>
  </tr></thead><tbody></tbody></table>
  </div></div></div>`; }
  async load(){ try{
    const r=await fetch('http://localhost:3000/cities'); const data=await r.json();
    const tb=this.querySelector('tbody'); tb.innerHTML='';
    data.forEach(row=>{ const tr=document.createElement('tr'); tr.innerHTML=`<td>${row.id||''}</td><td>${row.nombreCity||''}</td><td>${row.idCountry||''}</td><td>${row.idRegion||''}</td>`; tb.appendChild(tr); });
  }catch(e){ console.error(e); } }
}
customElements.define("lst-cities", LstCities);
