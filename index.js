let datos;
let solucion = Array();
let preguntas;
$(function(){
    ConsultaAjax();
    //Añade los datos de las categorias
    let categorias = ["","Javascript", "jQuery", "AngularJS", "PHP", "SQL"];
    for(let i = 0; i < categorias.length;i++){
        $("#select").append(`<option value="`+i+`">`+categorias[i]+`</option>`)
    }

    $("#button").click(function(){
        CreaPreguntas();
    });
});

function ConsultaAjax(){
    $.ajax({
		url : "test.json",
		type : "GET",
		dataType : "json",
		//async : false,
		success: function (data){
            datos = data;
		}
	});
}


function CreaPreguntas(){
    $("#resultado").html("");
    preguntas = $("input").val();
    categoria = $("#select").val();
    let numero = 0;
    //Desordenamos las preguntas y de esta manera salen aleatorias.
    datos.sort(function() { return 0.5 - Math.random()})
    for(let i = 0; i<datos.length && numero < preguntas;i++){
        console.log(preguntas)
        if(categoria == datos[i].categoria){
            numero++;
            $("#resultado").append(`<p>${numero}.- ${datos[i].pregunta}</p>`)
            for(let  j = 0; j<datos[i].respuestas.length;j++){
                $("#resultado").append(`<input type="radio" name="pregunta${i}" value="`+datos[i].respuestas[j].idrespuesta+`">${datos[i].respuestas[j].respuesta}</input><br>`);
            }
            solucion.push(datos[i].correcta)
            
        }
    }
    $("#resultado").append(`<button id="comprueba">Comprueba Test</button>`)
    $("input").prop('disabled', false);

    $("#comprueba").click(function(){
        ComprebaRespuesta();
    });
}

function ComprebaRespuesta(){
    let acierto = 0;
    let fallo = 0;
    let i = 0;
    $("input").each(function() {
        //Si está seleccionado muestra su value
        if($(this).prop('checked')) {
          if($(this).prop('value') == solucion[i]){
              acierto++;
          }
          else{
              fallo++
          }
          i++;
        }
      });
      $("#comprueba").remove()
      $("input").prop('disabled', true);
    $("#resultado").append(`<p>Has acertado ${acierto}, has fallado ${fallo} y has dejado en blanco ${preguntas -acierto -fallo}</p>`)

}