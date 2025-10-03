const URL_API = "http://localhost:3000";
const myHeaders = new Headers({ "Content-Type": "application/json" });

const BR_PATHS = ["branches", "branchs", "branch"];
const LS_KEY_B = "api_branches_base";

const probe = async (path) => {
  try {
    const r = await fetch(`${URL_API}/${path}`);
    if (r.ok) return path;
  } catch {}
  return null;
};

const resolveBaseB = async () => {
  let base = localStorage.getItem(LS_KEY_B);
  if (base) return base;
  for (const p of BR_PATHS) {
    const ok = await probe(p);
    if (ok) { localStorage.setItem(LS_KEY_B, ok); return ok; }
  }
  return BR_PATHS[0];
};

const getBranches = async () => {
  const base = await resolveBaseB();
  return fetch(`${URL_API}/${base}`);
};

const postBranches = async (datos) => {
  for (const p of BR_PATHS) {
    const r = await fetch(`${URL_API}/${p}`, { method:"POST", headers: myHeaders, body: JSON.stringify(datos) });
    if (r.ok) { localStorage.setItem(LS_KEY_B, p); return r; }
  }
  return new Response('Not Found', { status: 404, statusText: 'Not Found' });
};

const patchBranches = async (id, datos) => {
  const base = await resolveBaseB();
  return fetch(`${URL_API}/${base}/${id}`, { method:"PATCH", headers: myHeaders, body: JSON.stringify(datos) });
};
const deleteBranches = async (id) => {
  const base = await resolveBaseB();
  return fetch(`${URL_API}/${base}/${id}`, { method:"DELETE", headers: myHeaders });
};

export { getBranches, postBranches, patchBranches, deleteBranches };
