
//Crear una promesa que valida un calback que una fecha en el siguiente formato dd/mm/aaaa, no sea menor al dia de hoy
// la fecha es un string (cadena)

function callback(fechaRecibida, resultado = function() {}) {

    //Cambiar formato (Intercambiamos mes y dia para que Date acepte una fecha valida)
    fechaRecibida = fechaRecibida.split('/');
    let temp = fechaRecibida[0]
    fechaRecibida[0] = fechaRecibida[1];
    fechaRecibida[1] = temp;
    fechaRecibida = fechaRecibida.join('/');

    //Creamos las fechas
    let checkFecha = new Date(fechaRecibida);
    let fechaHoy = new Date();
    fechaHoy.setHours(0,0,0,0); //Seteamos las horas en 0 para no afectar la comparación

    // Realizamos la comparación
    if( checkFecha.getTime() < fechaHoy.getTime()) {
        resultado('Fecha invalida')
    }
    resultado('Fecha valida')
}

const promise = new Promise ( (resolve, reject) => {
    callback('02/01/2023', function (resultado) {
        if (resultado === "Fecha valida") {
          resolve("La fecha ingresada es valida");
        } else {
          reject("La fecha ingresada es menor al del dia de hoy");
        }
      });
})

promise
.then((value) => console.log(value))
.catch((err) => console.log(err));

