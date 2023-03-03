function validDate(date) {
  return new Promise((resolve, reject) => {
    var regex = /^\d{2}\/\d{2}\/\d{4}$/.test(date);
    if (!regex) {
      reject(new Error("Invalid format, it must be dd/mm/yyyy"));
    }

    var subDate = date.split("/");
    var day = subDate[0];
    var month = subDate[1];
    var year = subDate[2];

    formatDate = month + "-" + day + "-" + year;

    formatDate = new Date(formatDate);

    compareDates(new Date(), formatDate, resolve, reject);
  });
}

function compareDates(today, formatDate, resolve, reject) {
  if (formatDate < today) {
    reject(new Error("Date is less than the current day"));
  }

  /* Valida hora tambien por lo que es casi imposible que salga este error*/
  if (formatDate == today) {
    reject(new Error("Date is today's date"));
  }

  resolve();
}

validDate("21/12/1994")
  .then(function () {
    console.log("La fecha es válida");
  })
  .catch(function (error) {
    console.error(error.message);
  });
