import { postCities, patchCities, deleteCities } from '../../../Apis/contact/citiesApi.js';
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

    // ---- Loaders País/Región (una sola definición, fuera de eventos) ----
    this.loadCountriesForCities = async () => {
      try {
        const r = await fetch('http://localhost:3000/countries');
        const countries = await r.json();
        const selC = this.querySelector('#idCountry');
        const selR = this.querySelector('#idRegion');
        if (!selC || !selR) return;

        selC.innerHTML = '';
        selR.innerHTML = '';

        if (!countries || countries.length === 0) {
          selC.disabled = true;
          selR.disabled = true;
          this.querySelector('#btnGuardar').disabled = true;

          this.querySelector('#alertMsgCities')?.remove();
          const body = this.querySelector('#frmDataCities').closest('.card-body');
          const div = document.createElement('div');
          div.id = 'alertMsgCities';
          div.className = 'alert alert-warning mt-3';
          div.textContent = 'Primero crea Países y Regiones para poder crear Ciudades.';
          body.appendChild(div);
        } else {
          countries.forEach(c => {
            const o = document.createElement('option');
            o.value = c.id;
            o.textContent = c.nombreCountry;
            selC.appendChild(o);
          });
          selC.disabled = false;
          await this.loadRegionsForCountry(selC.value);
          this.querySelector('#btnGuardar').disabled = false;
        }

        // Cambio de país → cargar regiones
        selC.addEventListener('change', async (e) => {
          await this.loadRegionsForCountry(e.target.value);
        });
      } catch (e) {
        console.error(e);
      }
    };

    this.loadRegionsForCountry = async (countryId) => {
      const selR = this.querySelector('#idRegion');
      if (!selR) return;

      selR.innerHTML = '';
      try {
        const r = await fetch(`http://localhost:3000/regions?idCountry=${countryId}`);
        const regs = await r.json();

        if (!regs || regs.length === 0) {
          selR.disabled = true;
          this.querySelector('#btnGuardar').disabled = true;
        } else {
          regs.forEach(rg => {
            const o = document.createElement('option');
            o.value = rg.id;
            o.textContent = rg.nombreRegion;
            selR.appendChild(o);
          });
          selR.disabled = false;
          this.querySelector('#btnGuardar').disabled = false;
        }
      } catch (e) {
        console.error(e);
      }
    };

    // inicializar combos
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
          <form id="frmDataCities">
            <div class="row">
              <div class="col">
                <label for="idCountry" class="form-label">País</label>
                <select class="form-select" id="idCountry" name="idCountry"></select>
              </div>
              <div class="col">
                <label for="idRegion" class="form-label">Región</label>
                <select class="form-select" id="idRegion" name="idRegion"></select>
              </div>
            </div>
            <div class="row mt-2">
              <div class="col">
                <label for="nombreCity" class="form-label">Nombre Ciudad</label>
                <input type="text" class="form-control" id="nombreCity" name="nombreCity">
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

    // eventos de barra
    this.querySelector("#btnNuevo").addEventListener("click", (e) => {
      this.ctrlBtn(e.target.dataset.ed);
      this.resetIdView();
      this.disableFrm(false);
    });

    this.querySelector("#btnCancelar").addEventListener("click", (e) => {
      this.ctrlBtn(e.target.dataset.ed);
      this.resetIdView();
      this.disableFrm(true);
      // re-cargar combos por si se vaciaron
      this.loadCountriesForCities();
    });
  }

  resetIdView = () => {
    const idView = this.querySelector('#idView');
    idView.innerHTML = '';
  };

  eventoEditar = () => {
    this.querySelector('#btnEditar').addEventListener("click", (e) => {
      this.editData();
      e.stopImmediatePropagation();
      e.preventDefault();
    });
  };

  eventoEliminar = () => {
    this.querySelector('#btnEliminar').addEventListener("click", (e) => {
      this.delData();
      e.stopImmediatePropagation();
      e.preventDefault();
    });
  };

  ctrlBtn = (json) => {
    const data = JSON.parse(json);
    data[0].forEach(boton => {
      const btnActual = this.querySelector(boton);
      btnActual.classList.remove('disabled');
    });
    data[1].forEach(boton => {
      const btnActual = this.querySelector(boton);
      btnActual.classList.add('disabled');
    });
  };

  enabledBtns = () => {
    this.querySelectorAll(".btn").forEach((val) => {
      this.ctrlBtn(val.dataset.ed);
    });
  };

  editData = () => {
    const frmRegistro = this.querySelector('#frmDataCities');
    const datos = Object.fromEntries(new FormData(frmRegistro).entries());
    const idView = this.querySelector('#idView');
    const id = idView.textContent;

    patchCities(datos, id)
      .then(response => {
        if (response.ok) return response.json();
        throw new Error(`Error en la solicitud POST: ${response.status} - ${response.statusText}`);
      })
      .then(() => {
        // ok
      })
      .catch(error => {
        console.error('Error en la solicitud POST:', error.message);
      });
  };

  delData = () => {
    const idView = this.querySelector('#idView');
    const id = idView.textContent;

    deleteCities(id)
      .then(response => {
        if (response.ok) return response.json();
        throw new Error(`Error en la solicitud POST: ${response.status} - ${response.statusText}`);
      })
      .then(() => {
        this.resetIdView();
        this.disableFrm(true);
        this.loadCountriesForCities();
      })
      .catch(error => {
        console.error('Error en la solicitud POST:', error.message);
      });
  };

  saveData = () => {
    const frmRegistro = this.querySelector('#frmDataCities');
    this.querySelector('#btnGuardar').addEventListener("click", (e) => {
      const datos = Object.fromEntries(new FormData(frmRegistro).entries());

      postCities(datos)
        .then(response => {
          if (response.ok) return response.json();
          throw new Error(`Error en la solicitud POST: ${response.status} - ${response.statusText}`);
        })
        .then(responseData => {
          this.viewData(responseData.id);
          // notificar para refrescar listados
          try { window.dispatchEvent(new CustomEvent('data-changed', { detail: { type: 'cities' } })); } catch (_) {}
        })
        .catch(error => {
          console.error('Error en la solicitud POST:', error.message);
        });

      this.ctrlBtn(e.target.dataset.ed);
      e.stopImmediatePropagation();
      e.preventDefault();
    });
  };

  viewData = (id) => {
    const idView = this.querySelector('#idView');
    idView.innerHTML = id;
  };

  disableFrm = (estado) => {
    const frm = this.querySelector('#frmDataCities');
    if (!frm) return;
    const defaults = { nombreCity: '', idCountry: '', idRegion: '' };
    Object.keys(defaults).forEach((k) => {
      const el = frm.elements[k];
      if (el) {
        if (estado) el.value = defaults[k]; // solo reset al deshabilitar
        el.disabled = estado;
      }
    });
  };
}

customElements.define("reg-cities", RegCities);
