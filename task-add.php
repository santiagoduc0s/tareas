<?php

include('database.php');

if(isset($_POST['titulo']) && isset($_POST['descripcion'])) {
    
    $titulo = $_POST['titulo'];
    $descripcion = $_POST['descripcion'];
    
    $sentencia = "INSERT into task(titulo, descripcion) VALUES ('$titulo', '$descripcion')";
    $resultado = mysqli_query($connection, $sentencia);

    if (!$resultado) {
        die('Ocurrió un error al agregar la tarea');
    }

    echo "Tarea agregada";  

}
