<?php

include('database.php');

if(isset($_POST['id'])) {
    $id = mysqli_real_escape_string($connection, $_POST['id']); //crear una cadena SQL legal que se puede usar en una sentencia SQL

    $sentencia = "SELECT * from task WHERE id = {$id}";

    $resultado = mysqli_query($connection, $sentencia);
    if(!$resultado) {
        die('Ocurrió un error al buscar la tarea');
    }

    $json = array();
    while($fila = mysqli_fetch_array($resultado)) {
        $json[] = array(
            'id' => $fila['id'],
            'titulo' => $fila['titulo'],
            'descripcion' => $fila['descripcion']
        );
    }

    $jsonstring = json_encode($json[0]);
    echo $jsonstring;
}

?>
