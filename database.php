<?php

$connection = mysqli_connect(
  'localhost', 
  'root', 
  '', 
  'tasks_ajax'
);

if(!$connection) {
  die('Error en la conexion');
}

