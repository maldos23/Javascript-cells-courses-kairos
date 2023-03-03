function comprobarFecha(fecha) {
  return new Promise((resolve, reject) => {
    const dateObj = new Date(fecha);
    const validDate = !isNaN(dateObj.getTime());
    if (validDate) {
      resolve(dateObj);
    } else {
      reject('El dato ingresado no es una fecha válida.');
    }
  });
}
comprobarFecha('2023-03-02')
  .then((fecha) => {
    console.log('La fecha es válida:', fecha);
  })
  .catch((error) => {
    console.log('Error:', error);
  });
