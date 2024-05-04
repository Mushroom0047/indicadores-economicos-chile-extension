const TOKEN = '8c9b72be4650038729fe366be79096118280a559';
const urls = [
    {dolar: 'https://api.sbif.cl/api-sbifv3/recursos_api/dolar'}
    {euro: 'https://api.sbif.cl/api-sbifv3/recursos_api/euro'},
    {ipc: 'https://api.sbif.cl/api-sbifv3/recursos_api/ipc'},
    {uf: 'https://api.sbif.cl/api-sbifv3/recursos_api/uf'},
    {utm: 'https://api.sbif.cl/api-sbifv3/recursos_api/utm'},
    {utm: 'https://api.sbif.cl/api-sbifv3/recursos_api/dolar'},
]

function guardarFechaLocal(){
    // Obtener la fecha actual
    var fechaActual = new Date();
  
    // Verificar si la fecha ya está almacenada
    if (!localStorage.getItem('fechaGuardada')) {
      // Almacenar la fecha actual en localStorage
      localStorage.setItem('fechaGuardada', fechaActual.toString());
      console.log('Fecha almacenada localmente:', fechaActual);
    } else {
      // Obtener la fecha almacenada en localStorage y convertirla en un objeto Date
      var fechaGuardada = new Date(localStorage.getItem('fechaGuardada'));
      
      // Comparar la fecha almacenada con la fecha actual
      if (fechaGuardada.toDateString() !== fechaActual.toDateString()) {
        // Si las fechas son diferentes, llamar a la función updateData
        updateData();
        console.log('Se ha llamado a la función updateData.');
        // Actualizar la fecha almacenada en localStorage
        localStorage.setItem('fechaGuardada', fechaActual.toString());
        console.log('Fecha actualizada localmente:', fechaActual);
      } else {
        console.log('La fecha almacenada es igual a la fecha actual.');
      }
    }
  }
  
  function updateData() {
    // Tu lógica para actualizar los datos aquí
    console.log('Los datos se están actualizando...');
  }
  
  // Llamar a la función para guardar la fecha local
  guardarFechaLocal()