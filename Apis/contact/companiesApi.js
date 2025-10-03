const URL_API = "http://localhost:3000";
const myHeaders = new Headers({ "Content-Type": "application/json" });

const COMP_PATHS = ["companies", "companys", "company"];
const LS_KEY = "api_companies_base";

const probe = async (path) => {
  try {
    const r = await fetch(`${URL_API}/${path}`);
    if (r.ok) return path;
  } catch {}
  return null;
};

const resolveBase = async () => {
  let base = localStorage.getItem(LS_KEY);
  if (base) return base;
  for (const p of COMP_PATHS) {
    const ok = await probe(p);
    if (ok) { localStorage.setItem(LS_KEY, ok); return ok; }
  }
  // fallback default (may 404 if no collection in db.json)
  return COMP_PATHS[0];
};

const getCompanies = async () => {
  const base = await resolveBase();
  const r = await fetch(`${URL_API}/${base}`);
  return r;
};

const postCompanies = async (datos) => {
  // Try each path until one works
  for (const p of COMP_PATHS) {
    const r = await fetch(`${URL_API}/${p}`, { method:"POST", headers: myHeaders, body: JSON.stringify(datos) });
    if (r.ok) { localStorage.setItem(LS_KEY, p); return r; }
  }
  // If none OK, return last response or a synthetic 404-like Response
  return new Response('Not Found', { status: 404, statusText: 'Not Found' });
};

const patchCompanies = async (id, datos) => {
  const base = await resolveBase();
  return fetch(`${URL_API}/${base}/${id}`, { method:"PATCH", headers: myHeaders, body: JSON.stringify(datos) });
};

const deleteCompanies = async (id) => {
  const base = await resolveBase();
  return fetch(`${URL_API}/${base}/${id}`, { method:"DELETE", headers: myHeaders });
};

export { getCompanies, postCompanies, patchCompanies, deleteCompanies };
