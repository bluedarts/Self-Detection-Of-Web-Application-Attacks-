<?php
$type = $_POST['type'];
$user = $_POST['user'];
$tb_name = 'person';

@ $db = new mysqli('localhost', 'root', '', 'will');
if (mysqli_connect_errno()) {
    error_log("Error: can not connect to database");
    exit;
}

switch ($type) {
    case "info": {
        $query = sprintf("SELECT * FROM %s", $tb_name);
        $result = $db->query($query);
        if (!$result) {
            error_log("Error: can not query from database");
            exit;
        }

        $clients = Array();
        $num_results = $result->num_rows;

        for ($i = 0; $i < $num_results; $i++) {
            $row = $result->fetch_assoc();
            $id = $row['id'];
            $name = $row['name'];
            $passwd = $row['passwd'];
            $age = $row['age'];
            $job = $row['job'];
            $client = Array("id" => $id, "name" => $name, "passwd" => $passwd, "age" => $age, "job" => $job);
            array_push($clients, $client);
        }
        echo json_encode($clients);
        break;

        $result->free();
        $db->close();
    }
    case "content": {
        $query = sprintf("SELECT * FROM %s WHERE name ='%s' or passwd ='%s' or age =%d or job = '%s'", $tb_name, $user['name'], $user['passwd'], $user['age'], $user['job']);
        $result = $db->query($query);
        if (!$result) {
            error_log("Error: can not query from database");
            exit;
        }

        $clients = Array();
        $num_results = $result->num_rows;

        for ($i = 0; $i < $num_results; $i++) {
            $row = $result->fetch_assoc();
            $id = $row['id'];
            $name = $row['name'];
            $passwd = $row['passwd'];
            $age = $row['age'];
            $job = $row['job'];
            $client = Array("id" => $id, "name" => $name, "passwd" => $passwd, "age" => $age, "job" => $job);
            array_push($clients, $client);
        }
        echo json_encode($clients);
        break;

        $result->free();
        $db->close();
    }
    case "time": {
	error_log("enter time");
	error_log($user);
        $query = sprintf("%s", $user);
        $result = $db->query($query);
        if (!$result) {
            error_log("Error: can not query from database");
            exit;
        }
        echo json_encode("ok");
        break;
    }
    default:
        break;
}
?>
