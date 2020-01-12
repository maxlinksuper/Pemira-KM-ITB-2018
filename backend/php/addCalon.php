<?php 
    $nim = isset($_POST["nim"]) ? $_POST["nim"] : "13516088";
    $nama = isset($_POST["nama"]) ? $_POST["nama"] : "HolyHawk";
    $command = isset($_POST["cmd"]) ? $_POST["cmd"] : 0;
    $pilKM = isset($_POST["pilKM"]) ? $_POST["pilKM"] : -1;
    $pilMWA = isset($_POST["pilMWA"]) ? $_POST["pilMWA"] : -1;
    $kode = isset($_POST["kode"]) ? $_POST["kode"] : "000";
    $tPWD = isset($_POST["pwd"]) ? $_POST["pwd"] : "";
    $cDari = isset($_POST["dari"]) ? $_POST["dari"] : "";
    $img = isset($_POST["img"]) ? $_POST["img"] : "";
    $uPWD = isset($_POST["uPwd"]) ? $_POST["uPwd"] : "";
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
    $tabel = "data_pemilih";
    if ($command == 1) {
        $sql = "SELECT nim FROM {$tabel} WHERE nim = {$nim} AND have_chosen = '0'";
        $check = $connection->query($sql);
        if ($check->num_rows > 0) {
            $sql = "UPDATE {$tabel} SET have_chosen=1 WHERE nim = {$nim} ";
            $resp->found = 1;
        }
        else {
            $resp->found = 0;
        }
    }
    elseif ($command == 2) {
        $reset = "DELETE FROM data_pilihan";
        $res = $connection->query($reset);
        $sql = "UPDATE {$tabel} SET have_chosen=0";
    }
    elseif ($command == 3) {
        $tabel = "passwordtps";
        $sql = "SELECT No FROM {$tabel} WHERE Password = '{$tPWD}'";
        $check = $connection->query($sql);
        if ($check->num_rows > 0) {
            $resp->found = 1;
        }
        else {
            $resp->found = 0;
        }
    }
    elseif ($command == 4) {
        $tabel = "data_pilihan";
        $sql = "INSERT INTO {$tabel} (kode, pilihan_km, pilihan_mw) VALUES ({$kode}, {$pilKM}, {$pilMWA})";
    }
    elseif ($command == 5) {
        echo("Wow");
        echo($nim);
        $tabel = "calon";
        $sql = "INSERT INTO {$tabel} (nim, nama, dari, img) VALUES ('{$nim}', '{$nama}', '{$cDari}', '${img}')";
    }
    elseif ($command == 6) {
        $sql = "UPDATE {$tabel} SET have_chosen=0 where nim = {$nim}";
    }
    elseif ($command == 7) {
        $tabel = "passworddatabase";
        $sql = "SELECT No FROM {$tabel}";
        $check = $connection->query($sql);
        $passnum = (int)$check->num_rows + 1;
        echo($passnum);
        $hashedpass = hash('ripemd160',"{$uPWD}");
        $sql = "INSERT INTO {$tabel} (No, password) VALUES ({$passnum}, '{$hashedpass}')"; 
    }
    $result = $connection->query($sql);

    if ($result) {
        $resp->success = true;
    }
    else {
        $resp->success = false;
        $resp->error_message = $connection->error;
        $resp->gg = $nim;
    }

    echo json_encode($resp);

?>