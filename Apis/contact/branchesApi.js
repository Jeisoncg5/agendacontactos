const URL_API = "http://localhost:3000";
const myHeaders = new Headers({ "Content-Type": "application/json" });
const getBranches = async()=> fetch(`${URL_API}/branches`);
const postBranches = async(datos)=> fetch(`${URL_API}/branches`, { method:"POST", headers: myHeaders, body: JSON.stringify(datos) });
const patchBranches = async(id, datos)=> fetch(`${URL_API}/branches/${id}`, { method:"PATCH", headers: myHeaders, body: JSON.stringify(datos) });
const deleteBranches = async(id)=> fetch(`${URL_API}/branches/${id}`, { method:"DELETE", headers: myHeaders });
export { getBranches, postBranches, patchBranches, deleteBranches };
