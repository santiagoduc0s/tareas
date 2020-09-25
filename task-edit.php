<?php

include('database.php');

if(isset($_POST['id'])) {

    $titulo = $_POST['titulo']; 
    $descripcion = $_POST['descripcion'];
    $id = $_POST['id'];
    
    $sentencia = "UPDATE task SET titulo = '$titulo', descripcion = '$descripcion' WHERE id = '$id'";
    $resultado = mysqli_query($connection, $sentencia);

    if (!$resultado) {
        die('Ocurrió un error al modificar la tarea');
    }

    echo "Tarea modificada.";  

}
