<?php

include('database.php');

$query = "SELECT * from task";
$result = mysqli_query($connection, $query);

if(!$result) {
    die('Ocurrió un error al listar las tareas');
}

$json = array();
while($fila = mysqli_fetch_array($result)) {
    $json[] = array(
        'id' => $fila['id'],
        'titulo' => $fila['titulo'],
        'descripcion' => $fila['descripcion']
    );
}

$jsonstring = json_encode($json);
echo $jsonstring;
?>
