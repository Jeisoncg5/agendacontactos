const URL_API = "http://localhost:3000";
const myHeaders = new Headers({ "Content-Type": "application/json" });
const getCompanies = async()=> fetch(`${URL_API}/companies`);
const postCompanies = async(datos)=> fetch(`${URL_API}/companies`, { method:"POST", headers: myHeaders, body: JSON.stringify(datos) });
const patchCompanies = async(id, datos)=> fetch(`${URL_API}/companies/${id}`, { method:"PATCH", headers: myHeaders, body: JSON.stringify(datos) });
const deleteCompanies = async(id)=> fetch(`${URL_API}/companies/${id}`, { method:"DELETE", headers: myHeaders });
export { getCompanies, postCompanies, patchCompanies, deleteCompanies };
