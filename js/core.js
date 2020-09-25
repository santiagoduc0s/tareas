var ultimaTareaSeleccionada = 0;
var contadorDeClicks = false;
var editando = false;

function mostrarTareas() {
    $.ajax({
        url: "tasks-list.php",
        type: "GET",
        success: function (response) {
            const tasks = JSON.parse(response);
            if (tasks.length > 0) {
                let contenidoHtml = "";
                tasks.forEach((task) => {
                    contenidoHtml += `
                        <tr>
                            <td>
                                <a href="#" class="titulo-tarea" onclick="modificarTarea(${task.id}, event)">
                                    ${task.titulo} 
                                </a>
                            </td>
                            <td>
                                ${task.descripcion}
                            </td>
                            <td>
                                <button class="borrar-tarea btn btn-danger" value="${task.id}">
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    `;
                });
                $("#tasks").html(contenidoHtml);
            } else {
                $("#tasks").html('No hay tareas');
            }
        },
    });
}

function buscarTarea() {
    if ($("#search").val() != '') {
        let valorBuscado = $("#search").val();
        $.ajax({
            url: "task-search.php",
            type: "POST",
            data: { valorIngresado: valorBuscado }, // se puede enviar un string ('') o un objeto ({})
            success: function (response) {
                if (!response.error) {
                    let tasks = JSON.parse(response);
                    if (tasks.length != 0) {
                        let contenidoHtml = "";
                        tasks.forEach((task) => {
                            contenidoHtml += `
                                <li><a href="#" class="task-item">${task.titulo}</a></li>
                            `;
                        });
                        $("#task-result").show();
                        $("#container").html(contenidoHtml);
                    } else {
                        $("#task-result").show();
                        $("#container").html('No hay resultados');
                    }
                }
            },
        });
    } else {
        $("#task-result").hide();
    }
}

function eliminarTarea(idTarea) {
    $.post("task-delete.php", { id : idTarea }, (response) => {
        $("#task-result").show();
        $("#container").html(response);
        mostrarTareas();
    });
}

function modificarTarea(idTarea, evento) {
    if (idTarea != ultimaTareaSeleccionada || contadorDeClicks) {
        ultimaTareaSeleccionada = idTarea;
        editando = true;
        contadorDeClicks = false;
        $.post("task-single.php", { id: idTarea }, (response) => {
            let json = JSON.parse(response);
            $("#tarea-id").val(json.id);
            $("#titulo").val(json.titulo);
            $("#descripcion").val(json.descripcion);
        });
    } else if (idTarea == ultimaTareaSeleccionada) {
        $("#tarea-id").val('');
        $("#titulo").val('');
        $("#descripcion").val('');
        contadorDeClicks = true;
        editando = false;
    }
    let x = evento.cancelable; // verificamos si el evento es cancelable
    //console.log(x);
    evento.preventDefault();
}

function agregarOModificarTarea() {
    let tarea = {
        id: parseInt($("#tarea-id").val()),
        titulo: $("#titulo").val(),
        descripcion: $("#descripcion").val(),
    };

    let url = editando ? "task-edit.php" : "task-add.php";

    $.post(url, tarea, (response) => { // simplificacion de ajax

        $("#task-result").show();
        $("#container").html(response);

        $("#task-form").trigger("reset"); // se resetea el formulario
        mostrarTareas();
    });
}

$(document).ready(function () {
    
    mostrarTareas();
    $("#task-result").hide();

    // Evento buscar y mostrar tarea/s
    $("#search").keyup(function () {
        buscarTarea();
    });

    // Evento agregar o modificar tarea
    $("#task-form").submit((evento) => {
        evento.preventDefault(); // cancela el evento
        
        agregarOModificarTarea();

        //esto tiene nada que ver con la creacion de una tarea, tiene que ver con la modificacion
        editando = false;
        contadorDeClicks = true;
    });

    // Evento elimanar tarea
    $(document).on("click", ".borrar-tarea", () => { // le agregamos un evento a los botones que tengan la clase 'borrar-tarea'
        if (confirm("Estas seguro de que quieres eliminarla?")) {
            let botonSeleccionado = $(this)[0].activeElement; // nos retorna el elemento (de un document)
            let id = $(botonSeleccionado).val();
            eliminarTarea(id);
        }
    });

});
