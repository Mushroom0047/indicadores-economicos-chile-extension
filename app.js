
document.addEventListener("DOMContentLoaded", function () {
  const loaderContainer = document.querySelector(".loader-container");
  const container = document.querySelector(".container");
  const dataErrorValues = document.querySelector("#data-error-values");
  const copyButtons = document.querySelectorAll(".copy-button");
  const selector = document.getElementById('currencyConverterSelector');
  let titleCurrency = document.querySelector('.title-divisa');
  const inputClp = document.getElementById('input-clp');
  const inputCurrency = document.getElementById('input-currency');

  //Comprobar datos
  guardarFechaLocal();

  // Otras variables
  let Uf, Euro, Dolar, Utm, currencySelected;
  
  // Mostrar el loader mientras se cargan los datos
  loaderContainer.style.display = "flex";
    const url = "https://mindicador.cl/api";
    // Obtener valores
    fetch(url)
      .then((response) => response.json())
      .then((data) => {     
        const fetchData = data;
        fillDataValues(fetchData);
        loaderContainer.style.display = "none";
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
        container.style.display = "none";
        dataErrorValues.style.display = "flex";
        loaderContainer.style.display = "none";
      });

  function fillDataValues(data){
    document.getElementById("data-date").textContent = convertDate(data.fecha); 
    document.getElementById("uf").textContent = `UF: ${formatToPesos(data.uf.valor)}`;
    document.getElementById("dolar").textContent = `Dólar: ${formatToPesos(data.dolar.valor)}`;
    document.getElementById("euro").textContent = `Euro: ${formatToPesos(data.euro.valor)}`;
    document.getElementById("ipc").textContent = `IPC: ${data.ipc.valor} %`;
    document.getElementById("utm").textContent = `UTM: ${formatToPesos(data.utm.valor)}`;
    //data for the converter
    Uf = data.uf;
    Dolar = data.dolar;
    Euro = data.euro;
    Utm = data.utm;
    updateConverterData(Uf.valor, 'UF');
  }

  function formatToPesos(valor) {
    // Verifica si el valor es un número válido
    if (typeof valor !== 'number' || isNaN(valor)) {
      return 'N/A'; // Valor no válido
    }
    // Formatea el número a pesos chilenos
    const formatoPesos = new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    });
  
    return formatoPesos.format(valor);
  }

  //Botones para copiar datos
  copyButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const container = button.parentElement;
      const textSeparated = container.querySelector("h3").textContent.split(":");
      const textToCopy = textSeparated[1];
      copyToClipboard(textToCopy);
  
      const icon = container.querySelector(".gg-copy");
      const copiedText = container.querySelector(".copied-text");
      icon.style.display = "none";
      copiedText.style.display = "inline";
  
      setTimeout(() => {
        icon.style.display = "block";
        copiedText.style.display = "none";
      }, 3000);
    });
  });

  function copyToClipboard(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }

  function convertDate(date) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Intl.DateTimeFormat('es-CL', options).format(new Date(date));
  }

  //*Conversor code
  selector.addEventListener('change', function () {
      switch (selector.value) {
          case 'UF':
            updateConverterData(Uf.valor, 'UF');
              break;
          case 'Dolar':
            updateConverterData(Dolar.valor, 'DÓLAR');
              break;
          case 'Euro':
            updateConverterData(Euro.valor, 'EURO');
              break;
          case 'UTM':
            updateConverterData(Utm.valor, 'UTM');
              break;
      }
  });

function updateConverterData(currencyValue, currencyName){
  document.getElementById('info-valor').textContent = `1 ${currencyName} = ${formatToPesos(currencyValue)}`;
  titleCurrency.textContent = currencyName;
  currencySelected = currencyValue;
  inputCurrency.value = (parseFloat(inputClp.value) / currencySelected).toFixed(2);
}

//? inputs converter
inputClp.addEventListener('input', (e) => {
  let value = e.target.value == ''? 0: parseFloat(e.target.value); 
  inputCurrency.value = (value / currencySelected).toFixed(2);
});

inputCurrency.addEventListener('input', (e) => {
  let value = e.target.value == ''? 0: parseFloat(e.target.value); 
  inputClp.value = (value * currencySelected).toFixed(2);
});

//!FIN DOM
 });


