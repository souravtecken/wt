<?php
    $servername = "localhost";
    $username = "root";
    $password = "";

    $conn = new mysqli($GLOBALS['servername'], $GLOBALS['username'], $GLOBALS['password'], 'users');
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $username = $_GET["user"];
        $sql = "SELECT todos from myusers WHERE username = '$username'";
        $todos = ($conn->query($sql))->fetch_assoc();
        echo json_encode($todos['todos']);    
    }
    else if ($_SERVER['REQUEST_METHOD'] === 'POST') {              
        $content = trim(file_get_contents("php://input"));        
        $decoded = json_decode($content, true);                
        $todos = $decoded['todos'];        
        $username = $decoded ['username'];                 
        $sql = "UPDATE myusers SET todos='$todos' WHERE username = '$username'";        
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