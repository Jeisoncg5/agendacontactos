const URL_API = "http://localhost:3000";
const myHeaders = new Headers({
    "Content-Type": "application/json"
});
const getRegions = async() => {
    try {
        const respuesta = await fetch(`${URL_API}/regions`);
		// Si la respuesta es correcta
		if(respuesta.status === 200){
			const datos = await respuesta.json();
		} else if(respuesta.status === 401){
            console.log('La url no es correcta');
		} else if(respuesta.status === 404){
            console.log('El el contacto  no existe');
		} else {
            console.log('Se presento un error en la peticion consulte al Administrador');
		} 
	} catch(error){
        console.log(error);
	}
    
}
const postRegions = async (datos) => {
    try {
        return await fetch(`${URL_API}/regions`, {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(datos)
        });
    } catch (error) {
        console.error('Error en la solicitud POST:', error.message);
    }
}
const patchRegions = async (datos,id) =>{

    try {
        return await fetch(`${URL_API}/regions/${id}`, {
            method: "PATCH",
            headers: myHeaders,
            body: JSON.stringify(datos)
        });
    } catch (error) {
        console.error('Error en la solicitud POST:', error.message);
    }

}
const deleteRegions = async (id) =>{

    try {
        return await fetch(`${URL_API}/regions/${id}`, {
            method: "DELETE",
            headers: myHeaders,
        });
    } catch (error) {
        console.error('Error en la solicitud POST:', error.message);
    }

}
export {
    getRegions as getRegions,
    postRegions as postRegions,
    patchRegions as patchRegions,
    deleteRegions as deleteRegions
};