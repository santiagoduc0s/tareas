<?php

include('database.php');

if(isset($_POST['id'])) {

    $id = $_POST['id'];
    $sentencia = "DELETE FROM task WHERE id = $id"; 
    $result = mysqli_query($connection, $sentencia);

    if (!$result) {
        die('Ocurrió un error al eliminar la tarea');
    }

    echo 'Tarea eliminada';  
}


