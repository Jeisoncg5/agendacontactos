import {postCities,patchCities,deleteCities} from '../../../Apis/contact/citiesApi.js';
import CitiesModel from '../../../Models/citiesModel.js';
export class RegCities extends HTMLElement {
constructor() {
    super();
    this.render();
    this.saveData();
    this.enabledBtns();
    this.eventoEditar();
    this.eventoEliminar();
    this.disableFrm(true);
    this.loadCountriesForCities = async () => {
        try{
            const r = await fetch('http://localhost:3000/countries');
            const countries = await r.json();
            const selC = this.querySelector('#idCountry');
            const selR = this.querySelector('#idRegion');
            if(!selC || !selR) return;
            selC.innerHTML = ''; selR.innerHTML = '';
            if(!countries || countries.length===0){
                selC.disabled = true; selR.disabled = true;
                this.querySelector('#btnGuardar').disabled = true;
                this.querySelector('#alertMsgCities')?.remove();
                const body = this.querySelector('#frmDataCities').closest('.card-body');
                const div = document.createElement('div');
                div.id = 'alertMsgCities';
                div.className = 'alert alert-warning mt-3';
                div.textContent = 'Primero crea Países y Regiones para poder crear Ciudades.';
                body.appendChild(div);
            }else{
                countries.forEach(c => {
                    const o = document.createElement('option');
                    o.value = c.id; o.textContent = c.nombreCountry;
                    selC.appendChild(o);
                });
                selC.disabled = false;
                await this.loadRegionsForCountry(selC.value);
                this.querySelector('#btnGuardar').disabled = false;
            }
            selC.addEventListener('change', async (e)=>{
                await this.loadRegionsForCountry(e.target.value);
            });
        }catch(e){ console.error(e); }
    }
    this.loadRegionsForCountry = async (countryId) => {
        const selR = this.querySelector('#idRegion');
        if(!selR) return;
        selR.innerHTML = '';
        try{
            const r = await fetch(`http://localhost:3000/regions?idCountry=${countryId}`);
            const regs = await r.json();
            if(!regs || regs.length===0){
                selR.disabled = true;
                this.querySelector('#btnGuardar').disabled = true;
            }else{
                regs.forEach(rg => {
                    const o = document.createElement('option');
                    o.value = rg.id; o.textContent = rg.nombreRegion;
                    selR.appendChild(o);
                });
                selR.disabled = false;
                this.querySelector('#btnGuardar').disabled = false;
            }
        }catch(e){ console.error(e); }
    }
    this.loadCountriesForCities();
    
}

render() {
    this.innerHTML = /* html */ `
    <style rel="stylesheet">
        @import "./App/Components/contacto/contactoStyle.css";
    </style>
        <div class="card mt-3">
            <div class="card-header">
                Registro de Ciudades <span class="badge rounded-pill text-bg-primary" id="idView"></span>
            </div>
            <div class="card-body">
                <form id="frmDataCities">\n                    <div class="row">\n                        <div class="col">\n                            <label for="idCountry" class="form-label">País</label>\n                            <select class="form-select" id="idCountry" name="idCountry"></select>\n                        </div>\n                        <div class="col">\n                            <label for="idRegion" class="form-label">Región</label>\n                            <select class="form-select" id="idRegion" name="idRegion"></select>\n                        </div>\n                    </div>
                    <div class="row">
                        <div class="col">
                            <label for="nombreCity" class="form-label">Nombre Ciudad</label>
                            <input type="text" class="form-control" id="nombreCity" name ="nombreCity">
                            
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
    this.loadCountriesForCities = async () => {
        try{
            const r = await fetch('http://localhost:3000/countries');
            const countries = await r.json();
            const selC = this.querySelector('#idCountry');
            const selR = this.querySelector('#idRegion');
            if(!selC || !selR) return;
            selC.innerHTML = ''; selR.innerHTML = '';
            if(!countries || countries.length===0){
                selC.disabled = true; selR.disabled = true;
                this.querySelector('#btnGuardar').disabled = true;
                this.querySelector('#alertMsgCities')?.remove();
                const body = this.querySelector('#frmDataCities').closest('.card-body');
                const div = document.createElement('div');
                div.id = 'alertMsgCities';
                div.className = 'alert alert-warning mt-3';
                div.textContent = 'Primero crea Países y Regiones para poder crear Ciudades.';
                body.appendChild(div);
            }else{
                countries.forEach(c => {
                    const o = document.createElement('option');
                    o.value = c.id; o.textContent = c.nombreCountry;
                    selC.appendChild(o);
                });
                selC.disabled = false;
                await this.loadRegionsForCountry(selC.value);
                this.querySelector('#btnGuardar').disabled = false;
            }
            selC.addEventListener('change', async (e)=>{
                await this.loadRegionsForCountry(e.target.value);
            });
        }catch(e){ console.error(e); }
    }
    this.loadRegionsForCountry = async (countryId) => {
        const selR = this.querySelector('#idRegion');
        if(!selR) return;
        selR.innerHTML = '';
        try{
            const r = await fetch(`http://localhost:3000/regions?idCountry=${countryId}`);
            const regs = await r.json();
            if(!regs || regs.length===0){
                selR.disabled = true;
                this.querySelector('#btnGuardar').disabled = true;
            }else{
                regs.forEach(rg => {
                    const o = document.createElement('option');
                    o.value = rg.id; o.textContent = rg.nombreRegion;
                    selR.appendChild(o);
                });
                selR.disabled = false;
                this.querySelector('#btnGuardar').disabled = false;
            }
        }catch(e){ console.error(e); }
    }
    this.loadCountriesForCities();
    
    })
}
resetIdView =() =>{
    const idView = document.querySelector('#idView');
    idView.innerHTML = '';   
}
eventoEditar =() =>{
    document.querySelector('#btnEditar').addEventListener("click",(e) =>{
        this.editData();
        e.stopImmediatePropagation();
        e.preventDefault();        
    });
}
eventoEliminar =() =>{
    document.querySelector('#btnEliminar').addEventListener("click",(e) =>{
        this.delData();
        e.stopImmediatePropagation();
        e.preventDefault();        
    });
}
ctrlBtn = (e) =>{
    let data = JSON.parse(e);
    data[0].forEach(boton => {
        let btnActual = document.querySelector(boton);
        btnActual.classList.remove('disabled');
    });
    data[1].forEach(boton => {
        let btnActual = document.querySelector(boton);
        btnActual.classList.add('disabled');
    });
}
enabledBtns =() =>{
    document.querySelectorAll(".btn").forEach((val, id) => {
        this.ctrlBtn(val.dataset.ed);
    })
}
editData = () =>{
    const frmRegistro = document.querySelector('#frmDataCities');
    const datos = Object.fromEntries(new FormData(frmRegistro).entries());
    const idView = document.querySelector('#idView');
    let id = idView.textContent;
    patchCities(datos,id)
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
    const idView = document.querySelector('#idView');
    let id = idView.textContent;
    deleteCities(id)
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
    this.loadCountriesForCities = async () => {
        try{
            const r = await fetch('http://localhost:3000/countries');
            const countries = await r.json();
            const selC = this.querySelector('#idCountry');
            const selR = this.querySelector('#idRegion');
            if(!selC || !selR) return;
            selC.innerHTML = ''; selR.innerHTML = '';
            if(!countries || countries.length===0){
                selC.disabled = true; selR.disabled = true;
                this.querySelector('#btnGuardar').disabled = true;
                this.querySelector('#alertMsgCities')?.remove();
                const body = this.querySelector('#frmDataCities').closest('.card-body');
                const div = document.createElement('div');
                div.id = 'alertMsgCities';
                div.className = 'alert alert-warning mt-3';
                div.textContent = 'Primero crea Países y Regiones para poder crear Ciudades.';
                body.appendChild(div);
            }else{
                countries.forEach(c => {
                    const o = document.createElement('option');
                    o.value = c.id; o.textContent = c.nombreCountry;
                    selC.appendChild(o);
                });
                selC.disabled = false;
                await this.loadRegionsForCountry(selC.value);
                this.querySelector('#btnGuardar').disabled = false;
            }
            selC.addEventListener('change', async (e)=>{
                await this.loadRegionsForCountry(e.target.value);
            });
        }catch(e){ console.error(e); }
    }
    this.loadRegionsForCountry = async (countryId) => {
        const selR = this.querySelector('#idRegion');
        if(!selR) return;
        selR.innerHTML = '';
        try{
            const r = await fetch(`http://localhost:3000/regions?idCountry=${countryId}`);
            const regs = await r.json();
            if(!regs || regs.length===0){
                selR.disabled = true;
                this.querySelector('#btnGuardar').disabled = true;
            }else{
                regs.forEach(rg => {
                    const o = document.createElement('option');
                    o.value = rg.id; o.textContent = rg.nombreRegion;
                    selR.appendChild(o);
                });
                selR.disabled = false;
                this.querySelector('#btnGuardar').disabled = false;
            }
        }catch(e){ console.error(e); }
    }
    this.loadCountriesForCities();
    
        this.ctrlBtn(e.target.dataset.ed);
        // Hacer algo con la respuesta exitosa si es necesario
    })
    .catch(error => {
        console.error('Error en la solicitud POST:', error.message);
        // Puedes manejar el error de otra manera si es necesario
    });   
}
saveData = () =>{
        const frmRegistro = document.querySelector('#frmDataCities');
        document.querySelector('#btnGuardar').addEventListener("click",(e) =>{
            const datos = Object.fromEntries(new FormData(frmRegistro).entries());
            postCities(datos)
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
    const idView = document.querySelector('#idView');
    idView.innerHTML = id;
}
disableFrm = (estado) =>{
    let frm={
        nombreCity: '', 
        idCountry: '',
        idRegion: ''
    }
        const frmRegistro = document.querySelector('#frmDataCities');
        let myFrm = new FormData();
        Object.entries(CitiesModel).forEach(([key, value]) => myFrm.append(key, value));
        myFrm.forEach((value, key) => {
            frmRegistro.elements[key].value= value;
            frmRegistro.elements[key].disabled = estado;
        })
    }
}
customElements.define("reg-cities", RegCities);