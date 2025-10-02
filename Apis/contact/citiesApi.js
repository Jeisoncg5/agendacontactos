const URL_API = "http://localhost:3000";
const myHeaders = new Headers({
    "Content-Type": "application/json"
});
const getCities = async() => {
    try {
        const respuesta = await fetch(`${URL_API}/cities`);
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
const postCities = async (datos) => {
    try {
        return await fetch(`${URL_API}/cities`, {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(datos)
        });
    } catch (error) {
        console.error('Error en la solicitud POST:', error.message);
    }
}
const patchCities = async (datos,id) =>{

    try {
        return await fetch(`${URL_API}/cities/${id}`, {
            method: "PATCH",
            headers: myHeaders,
            body: JSON.stringify(datos)
        });
    } catch (error) {
        console.error('Error en la solicitud POST:', error.message);
    }

}
const deleteCities = async (id) =>{

    try {
        return await fetch(`${URL_API}/cities/${id}`, {
            method: "DELETE",
            headers: myHeaders,
        });
    } catch (error) {
        console.error('Error en la solicitud POST:', error.message);
    }

}
export {
    getCities as getCities,
    postCities as postCities,
    patchCities as patchCities,
    deleteCities as deleteCities
};