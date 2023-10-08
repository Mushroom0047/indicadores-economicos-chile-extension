document.addEventListener("DOMContentLoaded", function () {
  const loaderContainer = document.querySelector(".loader-container");
  
  // Mostrar el loader mientras se cargan los datos
  loaderContainer.style.display = "flex";
    const url = "https://mindicador.cl/api";
    // Obtener valores
    fetch(url)
      .then((response) => response.json())
      .then((data) => {     
        document.getElementById("data-date").textContent = convertDate(data.fecha); 
        document.getElementById("uf").textContent = `UF: ${formatToPesos(data.uf.valor)}`;
        document.getElementById("dolar").textContent = `Dólar: ${formatToPesos(data.dolar.valor)}`;
        document.getElementById("euro").textContent = `Euro: ${formatToPesos(data.euro.valor)}`;
        document.getElementById("ipc").textContent = `IPC: ${data.ipc.valor} %`;
        document.getElementById("utm").textContent = `UTM: ${formatToPesos(data.utm.valor)}`;
        loaderContainer.style.display = "none";
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
        document.querySelector(".container").style.display = "none";
        document.querySelector("#data-error-values").style.display = "flex";
        // Ocultar el loader en caso de error
      loaderContainer.style.display = "none";
      });

  });
  

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
  const copyButtons = document.querySelectorAll(".copy-button");
  copyButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const container = button.parentElement;
      let textSeparated = container.querySelector("h3").textContent.split(":");
      const textToCopy = textSeparated[1];
      copyToClipboard(textToCopy);

    // Ocultar el ícono y mostrar el texto "Copiado"
    const icon = container.querySelector(".gg-copy");
    const copiedText = container.querySelector(".copied-text");
    icon.style.display = "none";
    copiedText.style.display = "inline";

     // Configurar un temporizador para restaurar el estado original
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