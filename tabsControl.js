document.addEventListener('DOMContentLoaded', function () {
    // Función para cambiar de pestaña
    function openTab(evt, tabName) {    
      var i, tabcontent, tablinks;
      tabcontent = document.getElementsByClassName('tabcontent');
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = 'none';
      }
      tablinks = document.getElementsByClassName('tablinks');
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }
        document.getElementById(tabName).style.display = 'block';
        if(evt == null){
            document.getElementById('tabValues').className += " active";
        }else{
            evt.currentTarget.className += " active";
        }
    }

    // Inicialmente, muestra la pestaña "Valores"
    openTab(null, 'valuesTab');

    // Agrega eventos de clic a las pestañas
    document.getElementById('tabValues').addEventListener('click', (e) => {
        openTab(e, 'valuesTab')
    });

    document.getElementById('tabCharts').addEventListener('click', (e) => {
        openTab(e, 'chartsTab')
    });

    
    document.getElementById('tabConvert').addEventListener('click', (e) => {
        openTab(e, 'convertTab')
    });
});