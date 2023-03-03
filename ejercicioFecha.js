function callbackDate(date, cbDate) {
  if (typeof date !== "string") throw new Error("'fecha' no es una cadena de texto");
  if (typeof cbDate !== "function") throw new Error("'cbDate' no es una funcion");
  const regExp = new RegExp(/^(\d{2})\/(\d{2})\/(\d{4})$/)
  if(!regExp.test(date)) throw new Error('El formato no es correcto');
  const objectDate = {
    day: Number(date.slice(0,2)),
    month: Number(date.slice(3,5)),
    year: Number(date.slice(6))
  }
  cbDate(objectDate);
}

const promiseDate = new Promise((resolve, reject) => {
  callbackDate('02/03/2023', function(date) {
    const actualDate = new Date();
    const inputDate = new Date(date.year, date.month-1, date.day);
    if(actualDate < inputDate) {
      resolve(`Se registro correctamente la fecha ${inputDate}`)
    } else {
      reject('La fecha ingresada no es valida')
    }
  })
})

promiseDate.then(res => console.log(res)).catch(err => console.log(err))