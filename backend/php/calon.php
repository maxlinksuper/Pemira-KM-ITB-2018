<?php
    $_GET = json_decode(file_get_contents('php://input'), true);
    $type = isset($_GET["type"]) ? $_GET["type"] : "0";
    $servername = "127.0.0.1";
    $usernamedb = "root";
    $passworddb = "";
    $dbname = "pemira";
    $connection = mysqli_connect($servername, $usernamedb, $passworddb, $dbname);

    $resp = new stdClass();
    if ($connection -> connect_error) {
        $resp->success = false;
        $resp->error_message = $connection -> connect_error;
        exit();
    }


    $tabel = "calon";
    $sql = "SELECT nim, nama, dari, img FROM {$tabel} WHERE dari = {$type}";
    
    if ($result = mysqli_query($connection,$sql)) {
        echo(json_encode(mysqli_fetch_all($result, MYSQLI_ASSOC)));
    } else {
        echo "Fetching data failed";
    }
    // echo(mysqli_fetch_all($result, MYSQLI_ASSOC));
?>