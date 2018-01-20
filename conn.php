<?php

    $servername = 'localhost';
    $dbname = 'arcanoid';
    $password = '';
    $username = 'root';

    $conn = mysqli_connect($servername, $username, $password, $dbname);
    if (!$conn){
        die("Подключение к базе неудачно завершилось!");
    }

?>