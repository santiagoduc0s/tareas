<?php

include('database.php');

$valorBuscado = $_POST['valorIngresado']; //dentro de $_POST esta el objeto enviado
if(!empty($valorBuscado)) {
    $sentencia = "SELECT * FROM task WHERE titulo LIKE '%$valorBuscado%'";
    $resultado = mysqli_query($connection, $sentencia);

    if(!$resultado) {
        die('Ocurrió un error al buscar las tareas');
    }

    $json = array();
    while($fila = mysqli_fetch_array($resultado)) {
        $json[] = array(
            'id' => $fila['id'],
            'titulo' => $fila['titulo'],
            'descripcion' => $fila['descripcion'],
        );
    }

    $jsonstring = json_encode($json);
    echo $jsonstring;
}
