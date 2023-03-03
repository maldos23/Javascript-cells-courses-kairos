// =====================================================================================

function fechas(date, callback){

    let regEx1 = new RegExp(/^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(\d\d\d\d)$/);
    if(!regEx1.test(date))throw new Error("Escribe la fecha en el formato dd/mm/yyyy");
    if( typeof date !== "string" )throw new Error("Ingrese un tipo string");
    if(typeof callback !== "function") throw new Error("'callback' no es funcion");

    let fechas = date.split("/");
    let dia = fechas[0];
    let mes =fechas[1];
    let anho = fechas[2];
    date = mes+"/"+dia+"/"+anho;
    callback(date);
}

//mm/dd/yyyy
fechas('02/03/2023', function(r){
    console.log(r);
})

const promiseX = new Promise( (resolve, reject) => {
    fechas('01/03/2023', (r) => {
        r = new Date(r).toLocaleDateString();
        let dato = new Date().toLocaleDateString();

        if( r >= dato)resolve(`La fecha ${r} es a partir de hoy!`)
        else reject(`La fehca ${r} es parte del pasado.`)
    })
});

promiseX
.then( result => console.log(result))
.catch( err => console.log(err))