let datos;
let solucion = Array();
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
    console.log(datos[1])

    preguntas = $("input").val();
    categoria = $("#select").val();
    for(let i = 0; i<preguntas;i++){
        //Cambiar datos[i] por datos[random] para que sean aleatorias las preguntas
        if(categoria == datos[i].categoria){
            $("#resultado").append(`<p>${i+1}.- ${datos[i].pregunta}</p>`)
            for(let  j = 0; j<datos[i].respuestas.length;j++){
                $("#resultado").append(`<input type="radio" name="pregunta${i}" value="`+datos[i].respuestas[j].idrespuesta+`">${datos[i].respuestas[j].respuesta}</input><br>`);
            }
            solucion.push(datos[i].correcta)
            
        }
    }
    $("#resultado").append(`<button id="comprueba">Comprueba Test</button>`)

    $("#comprueba").click(function(){
        ComprebaRespuesta();
    });
}

function ComprebaRespuesta(){
    let acierto = 0;
    let i = 0;
    $("input").each(function() {
        //Si está seleccionado muestra su value
        if($(this).prop('checked')) {
          if($(this).prop('value') == solucion[i]){
              acierto++;
          } 
          i++;
        }
      });
    console.log(acierto)
    //console.log(solucion)
    $("#resultado").append(`<p>Has acertado ${acierto} y has fallado ${i - aciertos}</p>`)

}