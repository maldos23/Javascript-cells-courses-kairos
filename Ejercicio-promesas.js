function validarFecha(fecha,result=function(){}) {
    //Verificamos que se ingresa un valor de tipo cadena
    if (typeof fecha !== 'string') {
      reject(new Error('El valor proporcionado no es valido'));
    }

    //Creamos una constante que tomara el formato
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;

    //verificamos que no sea otro formato al especificado
    if (!regex.test(fecha)) {
      result('El formato de la fecha no es válido;Favor de ingresarlo de la siguiente forma: "(dd/mm/aaaa)"');
    }
    //Creamos los valores a comparar seteandolo a tipo 'date'
    let fechaActual = new Date();

    let [dia,mes,aaaa]= fecha.split('/');
    const fechaProporcionada = new Date(aaaa, mes, dia);

    //Realizamos que la fecha ingresada no sea menor a la actual
    if (fechaProporcionada < fechaActual) {
      result('La fecha proporcionada es menor a la fecha actual');
    }

    result('La fecha es válida');
  ;
}
const promesaVF = new Promise ( (resolve, reject) => {
  validarFecha('02/03/2023', function (resultado) {
      if (resultado == 'La fecha es válida') {
        resolve("La fecha ingresada es valida");
      } else {
        reject("La fecha ingresada es menor al del dia de hoy");
      }
    });
})

promesaVF
.then((value) => console.log(value))
.catch((error) => console.log(error));