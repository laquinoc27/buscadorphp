$consultaBackend = function(datosForm){
  $.ajax({
    //url: './modelo/buscador.php',
    url: './buscador_mod.php',
    dataType: 'json',
    processData: false,
    contentType: false,
    data: datosForm,
    type: 'POST',
    success: function(response){
      console.log(response);
      document.getElementById('resultadobusqueda').innerHTML = '';
      for(let i = 0, j = response.length; i < j; i++){
        document.getElementById('resultadobusqueda').innerHTML+= '<div class="item card"><img src="img/home.jpg" alt="Home"><div class="badge"><b>Dirección: </b>'+response[i].Direccion+'<br><b>Ciudad: </b>'+response[i].Ciudad+'<br><b>Teléfono: </b>'+response[i].Telefono+'<br><b>Código postal: </b>'+response[i].Codigo_Postal+'<br><b>Tipo: </b>'+response[i].Tipo+'<br><b>Precio: </b><span class="precioTexto">'+response[i].Precio+'</span></div></div>';
      }
    },
    error: function(){
      alert('ERROR AL INVOCAR AJAX');
    }
  })
}

$(document).ready(function(){
  $('select').material_select();
  $('form').submit(function(e){
    e.preventDefault();

    let datosForm = new FormData(),
      inputs = $('input'),
      i_1 = inputs[0].value !== 'Elige una ciudad' ? inputs[0].value : '',
      i_2 = inputs[1].value !== 'Elige un tipo' ? inputs[1].value : '',
      i_3 = inputs[2].value;

    datosForm.append('mostrarTodo', '0');
    datosForm.append('ciudad', i_1);
    datosForm.append('tipo', i_2);
    datosForm.append('precio', i_3);

    $consultaBackend(datosForm);
  });

  $('#mostrarTodos').click(function(){
    let datosForm = new FormData();
    datosForm.append('mostrarTodo', '1');
    $consultaBackend(datosForm);
    //$("#selectCiudad").val('0');
  });
});

//Función jQuery para detectar cuando se detiene el scroll en la página
//=====================================================================
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};

// Inicializar la barra de precio
// ================================
function inicializarBarraPrecio(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 1000,
    to: 80000,
    prefix: "$"
  });
}

/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/

function playVideoOnScroll(){
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
       video.play();
     } else {
        //this.rewind(1.0, video, intervalRewind);
        video.play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
      video.pause();
    }, 10)
}

inicializarBarraPrecio();
playVideoOnScroll();
