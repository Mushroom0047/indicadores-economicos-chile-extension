document.addEventListener("DOMContentLoaded", function () {
    // Mostrar el loader mientras se cargan los datos
    const url = "https://mindicador.cl/api";
    let Uf, Euro, Dolar, Utm;
    let currency;

    async function fetchData() {
        try {
            const response = await fetch(url); // Realiza la solicitud Fetch de manera asincrónica
            if (!response.ok) {
                throw new Error('No se pudo obtener la respuesta correcta de la API.');
            }

            const data = await response.json();
            // Realiza el resto de las operaciones con los datos obtenidos
            Uf = data.uf;
            Euro = data.euro;
            Dolar = data.dolar;
            Utm = data.utm;
            currency = Uf;

            fillData(Uf);
        } catch (error) {
            console.error("Error al obtener datos:", error);
            document.querySelector(".container-convert").style.display = "none";
            document.querySelector("#data-error-converter").style.display = "flex";
        }
    }

    fetchData();

    const selector = document.getElementById('currencyConverterSelector');
    // Agrega un evento 'change' al selector
    selector.addEventListener('change', function () {
        // Utiliza un switch para realizar diferentes acciones en función de la opción seleccionada
        switch (selector.value) {
            case 'UF':
                fillData(Uf);
                currency = Uf;
                break;
            case 'Dolar':
                fillData(Dolar);
                currency = Dolar;
                break;
            case 'Euro':
                fillData(Euro);
                currency = Euro;
                break;
            case 'UTM':
                fillData(Utm);
                currency = Utm;
                break;

        }
    });

    const inputValor = document.getElementById('valor-clp');

    inputValor.addEventListener('input', function () {
        changeInput(inputValor.value);
    });

});

function changeInput(val) {
    let valor = parseFloat(val);
    let convertValue = valor * currency.valor;
    document.getElementById('valor-divisa').textContent = formatToPesos(convertValue);
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
    });

    return formatoPesos.format(valor);
}

function fillData(currency) {
    document.getElementById('info-valor').textContent = `1 ${currency.codigo.toUpperCase()} = ${formatToPesos(currency.valor)}`;
    document.getElementById('valor-divisa').textContent = formatToPesos(currency.valor);
}


