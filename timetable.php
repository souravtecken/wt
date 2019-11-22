<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "users";

    $conn = new mysqli($GLOBALS['servername'], $GLOBALS['username'], $GLOBALS['password'], $GLOBALS['dbname']);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $username = $_GET["user"];    
        $sql = "SELECT timetable from myusers WHERE username = '$username'";
        $timetable = ($conn->query($sql))->fetch_assoc();        
        echo json_encode($timetable['timetable']);    
    }
    else if ($_SERVER['REQUEST_METHOD'] === 'POST') {           
        $content = trim(file_get_contents("php://input"));        
        $decoded = json_decode($content, true);
        $timetable = $decoded['timetable'];
        $username = $decoded ['username'];                
        $sql = "UPDATE myusers SET timetable='$timetable' WHERE username = '$username'";        
        if(mysqli_query($conn, $sql)){
            $response = array();
            array_push($response, "Updated");
            echo json_encode($response);
        }
        else {
            $response = array();
            array_push($response, "Couldn't update");
            echo json_encote($response);
        }        
    }
?>