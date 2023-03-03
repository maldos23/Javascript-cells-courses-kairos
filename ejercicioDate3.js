function validarFecha(fecha) {
  return new Promise(function(resolve, reject) {
    // Validar el formato de la fecha
    var formatoValido = /^\d{2}\/\d{2}\/\d{4}$/.test(fecha);
    if (!formatoValido) {
      reject(new Error('El formato de la fecha debe ser dd/mm/aaaa'));
    }

    // Convertir la fecha en un objeto Date
    var partesFecha = fecha.split('/');
    var dia = parseInt(partesFecha[0], 10);
    var mes = parseInt(partesFecha[1], 10) - 1;
    var anio = parseInt(partesFecha[2], 10);
    var fechaObjeto = new Date(anio, mes, dia);

    // Validar que la fecha no sea menor que el día actual
    var fechaActual = new Date();
    if (fechaObjeto < fechaActual) {
      reject(new Error('La fecha no puede ser menor que el día actual'));
    }

    // Si la fecha es válida, resolver la promesa
    resolve();
  });
}

// Ejemplo de uso
validarFecha('02/03/2023')
  .then(function() {
    console.log('La fecha es válida');
  })
  .catch(function(error) {
    console.error(error.message);
  });
