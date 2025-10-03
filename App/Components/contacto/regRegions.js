import {postRegions,patchRegions,deleteRegions} from '../../../Apis/contact/regionsApi.js';
import RegionsModel from '../../../Models/regionsModel.js';
export class RegRegions extends HTMLElement {
constructor() {
    super();
    this.render();
    this.saveData();
    this.enabledBtns();
    this.eventoEditar();
    this.eventoEliminar();
    this.disableFrm(true);
    this.loadCountries = async () => {
        try{
            const r = await fetch('http://localhost:3000/countries');
            const countries = await r.json();
            const sel = this.querySelector('#idCountry');
            if(!sel) return;
            sel.innerHTML = '';
            if(!countries || countries.length===0){
                sel.disabled = true;
                this.querySelector('#btnGuardar').disabled = true;
                this.querySelector('#alertMsg')?.remove();
                const body = this.querySelector('#frmDataRegions').closest('.card-body');
                const div = document.createElement('div');
                div.id = 'alertMsg';
                div.className = 'alert alert-warning mt-3';
                div.textContent = 'Primero crea un País para poder crear Regiones.';
                body.appendChild(div);
            }else{
                countries.forEach(c => {
                    const opt = document.createElement('option');
                    opt.value = c.id;
                    opt.textContent = `${c.nombreCountry} (id ${c.id})`;
                    sel.appendChild(opt);
                });
                sel.disabled = false;
                this.querySelector('#btnGuardar').disabled = false;
            }
        }catch(e){ console.error(e); }
    }
    this.loadCountries();
    
}

render() {
    this.innerHTML = /* html */ `
    <style rel="stylesheet">
        @import "./App/Components/contacto/contactoStyle.css";
    </style>
        <div class="card mt-3">
            <div class="card-header">
                Registro de Regiones <span class="badge rounded-pill text-bg-primary" id="idView"></span>
            </div>
            <div class="card-body">
                <form id="frmDataRegions">\n                    <div class="row mt-2">\n                        <div class="col">\n                            <label for="idCountry" class="form-label">País</label>\n                            <select class="form-select" id="idCountry" name="idCountry"></select>\n                        </div>\n                    </div>
                    <div class="row">
                        <div class="col">
                            <label for="nombreRegion" class="form-label">Nombre Region</label>
                            <input type="text" class="form-control" id="nombreRegion" name ="nombreRegion">
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col">
                            <div class="container mt-4 text-center">
                                <a href="#" class="btn btn-primary"  id="btnNuevo" data-ed='[["#btnGuardar","#btnCancelar"],["#btnNuevo","#btnEditar","#btnEliminar"]]'>Nuevo</a>
                                <a href="#" class="btn btn-dark " id="btnCancelar" data-ed='[["#btnNuevo"],["#btnGuardar","#btnEditar","#btnEliminar","#btnCancelar"]]'>Cancelar</a>
                                <a href="#" class="btn btn-success" id="btnGuardar" data-ed='[["#btnEditar","#btnCancelar","#btnNuevo","#btnEliminar"],["#btnGuardar"]]'>Guardar</a>
                                <a href="#" class="btn btn-warning" id="btnEditar" data-ed='[[],[]]'>Editar</a>
                                <a href="#" class="btn btn-danger" id="btnEliminar" data-ed='[["#btnNuevo"],["#btnGuardar","#btnEditar","#btnEliminar","#btnCancelar"]]'>Eliminar</a>
                            </div>
                        </div>
                    </div> 
                </form>
            </div>
        </div>
    `;
    this.querySelector("#btnNuevo").addEventListener("click",(e) =>{
        this.ctrlBtn(e.target.dataset.ed);
        this.resetIdView();
        this.disableFrm(false);
    })
    this.querySelector("#btnCancelar").addEventListener("click",(e) =>{
        this.ctrlBtn(e.target.dataset.ed);
        this.resetIdView();
        this.disableFrm(true);
    this.loadCountries = async () => {
        try{
            const r = await fetch('http://localhost:3000/countries');
            const countries = await r.json();
            const sel = this.querySelector('#idCountry');
            if(!sel) return;
            sel.innerHTML = '';
            if(!countries || countries.length===0){
                sel.disabled = true;
                this.querySelector('#btnGuardar').disabled = true;
                this.querySelector('#alertMsg')?.remove();
                const body = this.querySelector('#frmDataRegions').closest('.card-body');
                const div = document.createElement('div');
                div.id = 'alertMsg';
                div.className = 'alert alert-warning mt-3';
                div.textContent = 'Primero crea un País para poder crear Regiones.';
                body.appendChild(div);
            }else{
                countries.forEach(c => {
                    const opt = document.createElement('option');
                    opt.value = c.id;
                    opt.textContent = `${c.nombreCountry} (id ${c.id})`;
                    sel.appendChild(opt);
                });
                sel.disabled = false;
                this.querySelector('#btnGuardar').disabled = false;
            }
        }catch(e){ console.error(e); }
    }
    this.loadCountries();
    
    })
}
resetIdView =() =>{
    const idView = this.querySelector('#idView');
    idView.innerHTML = '';   
}
eventoEditar =() =>{
    this.querySelector('#btnEditar').addEventListener("click",(e) =>{
        this.editData();
        e.stopImmediatePropagation();
        e.preventDefault();        
    });
}
eventoEliminar =() =>{
    this.querySelector('#btnEliminar').addEventListener("click",(e) =>{
        this.delData();
        e.stopImmediatePropagation();
        e.preventDefault();        
    });
}
ctrlBtn = (e) =>{
    let data = JSON.parse(e);
    data[0].forEach(boton => {
        let btnActual = this.querySelector(boton);
        btnActual.classList.remove('disabled');
    });
    data[1].forEach(boton => {
        let btnActual = this.querySelector(boton);
        btnActual.classList.add('disabled');
    });
}
enabledBtns =() =>{
    document.querySelectorAll(".btn").forEach((val, id) => {
        this.ctrlBtn(val.dataset.ed);
    })
}
editData = () =>{
    const frmRegistro = this.querySelector('#frmDataRegions');
    const datos = Object.fromEntries(new FormData(frmRegistro).entries());
    const idView = this.querySelector('#idView');
    let id = idView.textContent;
    patchRegions(datos,id)
    .then(response => {
        // Verificar si la solicitud fue exitosa (código de respuesta en el rango 200)
        if (response.ok) {
            return response.json(); // Devolver la respuesta como JSON
        } else {
            // Si la respuesta no fue exitosa, lanzar una excepción
            throw new Error(`Error en la solicitud POST: ${response.status} - ${response.statusText}`);
        }
    })
    .then(responseData => {
        // Hacer algo con la respuesta exitosa si es necesario
    })
    .catch(error => {
        console.error('Error en la solicitud POST:', error.message);
        // Puedes manejar el error de otra manera si es necesario
    });
    
}
delData = () =>{
    const idView = this.querySelector('#idView');
    let id = idView.textContent;
    deleteRegions(id)
    .then(response => {
        // Verificar si la solicitud fue exitosa (código de respuesta en el rango 200)
        if (response.ok) {
            return response.json(); // Devolver la respuesta como JSON
        } else {
            // Si la respuesta no fue exitosa, lanzar una excepción
            throw new Error(`Error en la solicitud POST: ${response.status} - ${response.statusText}`);
        }
    })
    .then(responseData => {
        this.resetIdView();
        this.disableFrm(true);
    this.loadCountries = async () => {
        try{
            const r = await fetch('http://localhost:3000/countries');
            const countries = await r.json();
            const sel = this.querySelector('#idCountry');
            if(!sel) return;
            sel.innerHTML = '';
            if(!countries || countries.length===0){
                sel.disabled = true;
                this.querySelector('#btnGuardar').disabled = true;
                this.querySelector('#alertMsg')?.remove();
                const body = this.querySelector('#frmDataRegions').closest('.card-body');
                const div = document.createElement('div');
                div.id = 'alertMsg';
                div.className = 'alert alert-warning mt-3';
                div.textContent = 'Primero crea un País para poder crear Regiones.';
                body.appendChild(div);
            }else{
                countries.forEach(c => {
                    const opt = document.createElement('option');
                    opt.value = c.id;
                    opt.textContent = `${c.nombreCountry} (id ${c.id})`;
                    sel.appendChild(opt);
                });
                sel.disabled = false;
                this.querySelector('#btnGuardar').disabled = false;
            }
        }catch(e){ console.error(e); }
    }
    this.loadCountries();
    
        this.ctrlBtn(e.target.dataset.ed);
        // Hacer algo con la respuesta exitosa si es necesario
    })
    .catch(error => {
        console.error('Error en la solicitud POST:', error.message);
        // Puedes manejar el error de otra manera si es necesario
    });   
}
saveData = () =>{
        const frmRegistro = this.querySelector('#frmDataRegions');
        this.querySelector('#btnGuardar').addEventListener("click",(e) =>{
            const datos = Object.fromEntries(new FormData(frmRegistro).entries());
            postRegions(datos)
            .then(response => {
                // Verificar si la solicitud fue exitosa (código de respuesta en el rango 200)
                if (response.ok) {
                    return response.json(); // Devolver la respuesta como JSON
                } else {
                    // Si la respuesta no fue exitosa, lanzar una excepción
                    throw new Error(`Error en la solicitud POST: ${response.status} - ${response.statusText}`);
                }
            })
            .then(responseData => {
                // Hacer algo con la respuesta exitosa si es necesario
                this.viewData(responseData.id);
            })
            .catch(error => {
                console.error('Error en la solicitud POST:', error.message);
                // Puedes manejar el error de otra manera si es necesario
            });
            this.ctrlBtn(e.target.dataset.ed);
            e.stopImmediatePropagation();
            e.preventDefault();
        })
}
viewData = (id)=>{
    const idView = this.querySelector('#idView');
    idView.innerHTML = id;
}
disableFrm = (estado) =>{
    let frm={
        nombreRegion: '', 
        idCountry: ''
    }
        const frmRegistro = this.querySelector('#frmDataRegions');
        let myFrm = new FormData();
        Object.entries(RegionsModel).forEach(([key, value]) => myFrm.append(key, value));
        myFrm.forEach((value, key) => {
            frmRegistro.elements[key].value= value;
            frmRegistro.elements[key].disabled = estado;
        })
    }
}
customElements.define("reg-regions", RegRegions);
try{ window.dispatchEvent(new CustomEvent('data-changed', { detail: { type: 'regions' } })); }catch(e){}
