README — Agenda Contactos (SPA)

Proyecto vanilla JS + Web Components para gestionar Countries, Regions, Cities, Companies y Branches.
Backend mock con json-server (REST) y UI modular con pestañas Registrar / Listado por entidad.

1) Requisitos

Node.js ≥ 16

json-server (global o local)

Un servidor estático para abrir index.html (p.ej. Live Server de VS Code)

npm i -g json-server

2) Estructura (resumen)

agendacontactos/
├─ index.html
├─ app.js
├─ db.json
├─ Apis/
│  └─ contact/
│     ├─ contactApi.js      
│     ├─ regionsApi.js
│     ├─ citiesApi.js
│     ├─ companiesApi.js
│     └─ branchesApi.js
├─ Models/
│  ├─ contactModel.js       
│  ├─ regionsModel.js
│  ├─ citiesModel.js
│  ├─ companiesModel.js
│  └─ branchesModel.js
└─ App/
   └─ Components/
      ├─ navMenu/
      │  └─ navMenu.js
      └─ contacto/
         ├─ contactoStyle.css
         ├─ contactoComponent.js  (Registrar/Listado)
         ├─ regContacto.js
         ├─ lstContacto.js
         ├─ regionComponent.js
         ├─ regRegions.js
         ├─ lstRegions.js
         ├─ citiesComponent.js
         ├─ regCities.js
         ├─ lstCities.js
         ├─ companiesComponent.js
         ├─ regCompanies.js
         ├─ lstCompanies.js
         ├─ branchesComponent.js
         ├─ regBranches.js
         └─ lstBranches.js

3) Arranque rápido


cd agendacontactos
json-server --watch db.json --port 3000


Sirve la app

Abre index.html con Live Server (o cualquier server estático).

Importante: en DevTools → Network marca Disable cache y recarga con Ctrl+F5 si haces cambios.

4) Endpoints (json-server)

GET/POST/PATCH/DELETE /countries

GET/POST/PATCH/DELETE /regions (usa idCountry como FK)

GET/POST/PATCH/DELETE /cities (usa idCountry, idRegion)

GET/POST/PATCH/DELETE /companies

GET/POST/PATCH/DELETE /branches (usa idCompany)

Consultas útiles

Regiones por país: /regions?idCountry=1

Ciudades por país: /cities?idCountry=1

Ciudades por región: /cities?idRegion=10

5) Reglas de negocio

Regions: solo se pueden crear si existen Countries. El formulario obliga a elegir idCountry.

Cities: solo se pueden crear si existen Countries y Regions del país elegido.
El formulario carga países y, al cambiar, carga sus regiones (/regions?idCountry=...).

Companies: campos obligatorios → nombreCompany, nit, email, address.

Branches: requiere idCompany y los campos → nombreBranch, email, contactName, phone, address, commercialNumber.

6) Eventos y refresco de listados

Tras crear/editar/eliminar, los formularios disparan:

window.dispatchEvent(new CustomEvent('data-changed', { detail: { type: '<entity>' } }));


Los componentes lst*.js escuchan ese evento y recargan su tabla automáticamente.

7) Menú y componentes

El menú monta un componente por entidad con dos pestañas:

Countries → <contacto-component>

Regions → <region-component>

Cities → <ciudad-component> / <cities-component> (alias)

Companies → <companies-component>

Branches → <branches-component>

Cada componente contiene:

Tab Registrar → <reg-...>

Tab Listado → <lst-...>

8) Ejemplo de db.json
{
  "countries": [
    { "id": 1, "nombreCountry": "Colombia" },
    { "id": 2, "nombreCountry": "Perú" }
  ],
  "regions": [
    { "id": 10, "nombreRegion": "Cundinamarca", "idCountry": 1 }
  ],
  "cities": [
    { "id": 100, "nombreCity": "Bogotá", "idCountry": 1, "idRegion": 10 }
  ],
  "companies": [
    { "id": 200, "nombreCompany": "Acme S.A.", "nit": "900123456", "email": "info@acme.com", "address": "Cra 7 # 12-34" }
  ],
  "branches": [
    { "id": 300, "idCompany": 200, "nombreBranch": "Sucursal Centro", "email": "centro@acme.com",
      "contactName": "Laura Pérez", "phone": "+57 301 555 55 55", "address": "Calle 10 # 5-20", "commercialNumber": "BR-001" }
  ]
}


9) Desarrollo rápido

Crear país → Countries / Registrar

Crear región → Regions / Registrar (elige país)

Crear ciudad → Cities / Registrar (elige país → región)

Crear empresa → Companies / Registrar

Crear sucursal → Branches / Registrar (elige company)

Cada creación actualiza su Listado automáticamente.