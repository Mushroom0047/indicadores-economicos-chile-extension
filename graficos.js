const urlApi = "https://mindicador.cl/api/";
const currencys = ['uf', 'dolar', 'euro', 'ipc', 'utm'];

const ufData = [];
const dolarData = [];
const euroData = [];
const ipcData = [];
const utmData = [];
const currencySelector = document.getElementById("currencySelector");

document.addEventListener("DOMContentLoaded", function () {
    fetchData(urlApi+currencys[0], ufData, 'UF');
});


currencySelector.addEventListener("change", function () {
  const selectedValue = currencySelector.value;
  switch (selectedValue) {
    case "UF":
        if(ufData.length == 0){
            fetchData(urlApi+currencys[0], ufData, 'UF');
        }else{
            prepareArrays(ufData, 'UF');
        }
      break;
    case "Dolar":    
        if(dolarData.length == 0){
            fetchData(urlApi+currencys[1], dolarData, 'Dólar');
        }else{
            prepareArrays(dolarData, 'Dólar');
        }
        
      break;
    case "Euro":
        if(euroData.length == 0){
            fetchData(urlApi+currencys[2], euroData, 'Euro');
        }else{
            prepareArrays(euroData, 'Euro');
        }
      break;
    case "IPC":
        if(ipcData.length == 0){
            fetchData(urlApi+currencys[3],ipcData, 'IPC');
        }else{
            prepareArrays(ipcData, 'IPC');
        }
      break;
    case "UTM":
        if(utmData.length == 0){
            fetchData(urlApi+currencys[4], utmData, 'UTM');
        }else{
            prepareArrays(utmData, 'UTM');
        }
      break;
  }
});
async function fetchData(url, dataArray, currency) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`No se pudo obtener datos de la API: ${url}`);
      }
      const data = await response.json();
      dataArray.push(data);
      prepareArrays(dataArray, currency);
      document.querySelector(".container-canvas").style.display = "block";
      document.querySelector("#data-error-chart").style.display = "none";
    } catch (error) {
      console.error(error);
      document.querySelector(".container-canvas").style.display = "none";
      document.querySelector("#data-error-chart").style.display = "flex";
    }
  }

  function prepareArrays(arr, currency){
    const tempDateArr = arr[0].serie.map(item => convertDate(item.fecha));  
    const tempValueArr = arr[0].serie.map(item => item.valor); 
    
    const labelsForChart = tempDateArr.slice(0, 7);
    const dataForChart = tempValueArr.slice(0, 7);
    
    generateCharts(labelsForChart.reverse(), dataForChart.reverse(), `Valor de ${currency}`);
  }
  const ctx = document.getElementById('myChart'); // Reemplaza 'myChart' con el ID de tu canvas

  let myChart; // Variable para mantener la referencia al gráfico

function generateCharts(labels = [], data = [], title) {
  // Verifica si el gráfico ya existe
  if (myChart) {
    myChart.data.labels = labels;
    myChart.data.datasets[0].data = data;
    myChart.data.datasets[0].label = title;
    myChart.update();
  } else {
    myChart = new Chart(ctx, {
      type: 'line',    
      data: {
        labels: labels,
        datasets: [{
          label: title,
          data: data,
          borderWidth: 1,
          borderColor: 'rgb(59, 186, 156)',
          backgroundColor: 'rgb(59, 186, 156)',
        }]
      },
      options: {
        scales: {
            x: {
                ticks: {
                    color: '#fff',
                }
            },
            y: {
                ticks: {
                    color: '#fff',
                }
            }
        }
    }
    });
  }
}

  function convertDate(date){
    let fechaOriginal = new Date(date);
    // Extraer día, mes y año de la fecha
    let dia = fechaOriginal.getUTCDate().toString().padStart(2, "0"); // Agregar ceros a la izquierda si es necesario
    let mes = (fechaOriginal.getUTCMonth() + 1).toString().padStart(2, "0"); // El mes está basado en 0, así que sumamos 1
    let año = fechaOriginal.getUTCFullYear();

    // Formatear la fecha en "dd-mm-AAAA"
    let fechaFormateada = `${dia}-${mes}-${año}`;
    return(fechaFormateada);
  }