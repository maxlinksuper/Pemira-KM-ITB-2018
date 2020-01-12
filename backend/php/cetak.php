<?php
    $_POST = json_decode(file_get_contents('php://input'), true);
    $pwd1 = isset($_POST["pwd1"]) ? $_POST["pwd1"] : "1";
    $pwd2 = isset($_POST["pwd2"]) ? $_POST["pwd2"] : "2";
    $pwd3 = isset($_POST["pwd3"]) ? $_POST["pwd3"] : "3";
    $pwd4 = isset($_POST["pwd4"]) ? $_POST["pwd4"] : "4";
    $pwd5 = isset($_POST["pwd5"]) ? $_POST["pwd5"] : "5";
    $pwd6 = isset($_POST["pwd6"]) ? $_POST["pwd6"] : "6";
    $servername = "127.0.0.1";
    $usernamedb = "root";
    $passworddb = "";
    $dbname = "pemira";

    $connection = new mysqli($servername, $usernamedb, $passworddb, $dbname);

    $resp = new stdClass();

    if ($connection -> connect_error) {
        $resp->success = false;
        $resp->error_message = $connection -> connect_error;
        exit();
    }
    
    // Hashing passwords
    $hashedpass1 = hash('ripemd160',"{$pwd1}");
    $hashedpass2 = hash('ripemd160',"{$pwd2}");
    $hashedpass3 = hash('ripemd160',"{$pwd3}");
    $hashedpass4 = hash('ripemd160',"{$pwd4}");
    $hashedpass5 = hash('ripemd160',"{$pwd5}");
    $hashedpass6 = hash('ripemd160',"{$pwd6}");

    $tabel = "passworddatabase";
    $sql = "SELECT * FROM {$tabel} WHERE password = '{$hashedpass1}' OR password = '{$hashedpass2}' OR password = '{$hashedpass3}' OR password = '{$hashedpass4}' OR password = '{$hashedpass5}' OR password = '{$hashedpass6}'";
    $check = $connection->query($sql);
    if ($check->num_rows == 6) {
        $resp->found = 1;
        $tabel = "data_pilihan";
        $sql = "SELECT * FROM {$tabel} ORDER BY kode";
        // $test = $connection->query($sql);
        $connect = mysqli_connect($servername, $usernamedb, $passworddb, $dbname);
        $get_data = mysqli_query($connect, $sql);
        $filename = 'kotaksuara.csv';
        $fp = fopen('export_files/../'.$filename, "w");
        $res = mysqli_query($connect,$sql);
        $row = mysqli_fetch_assoc($res);
        $line = "";
        $comma = "";
        foreach($row as $name => $value) {
        $line .= $comma . '"' . str_replace('"', '""', $name) . '"';
        $comma = ",";
        }
        $line .= "\n";
        fputs($fp, $line);
        mysqli_data_seek($res, 0);
        while($row = mysqli_fetch_assoc($res)) {

        $line = "";
        $comma = "";
        foreach($row as $value) {
            $line .= $comma . '"' . str_replace('"', '""', $value) . '"';
            $comma = ",";
        }
        $line .= "\n";
        fputs($fp, $line);
        }
        fclose($fp);
        echo " success :)  !!!!!!!!!!!!!!!!!!!!!!   Please check the file ";
    }
    else {
        $resp->found = 0;
    }

    if ($sql) {
        $resp->success = true;
    }
    else {
        $resp->success = false;
        $resp->error_message = $connection->error;
    }

    echo json_encode($resp);
?>