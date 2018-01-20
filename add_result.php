<?php

    include("conn.php");

    if (isset($_POST["score"])){
        $score = addslashes($_POST["score"]);
        $name  = addslashes($_POST["name"]);
        $sql = "INSERT INTO results (name, score) VALUES('".$name."', ".$score.");";
        $result = mysqli_query($conn, $sql);
        if ($result){
            echo "Ваш результат успешно добавлен в таблицу результатов!";   
        }
        else{
            echo "По неведомым причинам, ваш результат не добавлен в таблицу результатов";
        }
    }

?>