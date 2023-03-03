
const moment = require('moment');

function VerifyFecha(dia, vf = function () {}){

    let ingreso = moment(dia, 'DD/MM/YYYY').toDate();
    const hoy = new Date();
    console.log("hoy: ", hoy);
    console.log("dia: ", ingreso)

    vf(hoy, ingreso);
}

const promise1 = new Promise(function (resolve, reject) {
    VerifyFecha('30/12/2013', function(hoy, ingreso) {
        if (moment(hoy).isBefore(ingreso)) {
            resolve("fecha proxima");
        }else {
            reject("fecha pasada");
        }
    }) 
});

promise1
.then((value) => console.log(value))
.catch((err) => console.log(err));