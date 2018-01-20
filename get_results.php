<?php

    include("conn.php");

    $sql = "SELECT * FROM results ORDER BY score DESC LIMIT 10";

    $result = mysqli_query($conn, $sql);

    $cnt = 1;
    while ($row = mysqli_fetch_array($result)){
        echo "<p class='text-primary text-center results-menu_row'>".$cnt.") ".$row["name"].". Score: ".$row["score"]."</p>";
        $cnt += 1;
    }

?>