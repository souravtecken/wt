<!DOCTYPE html>
<html>
    <head>        
        <title>Login</title>
        <link href="https://fonts.googleapis.com/css?family=Quicksand&display=swap" rel="stylesheet">
        <link rel="stylesheet" type="text/css" href="./css/login.css"/>
    </head>
    <script>
        function toggleLoginSignup(){            
            const loginContainer = document.getElementsByClassName('login-container')[0];
            const signupContainer = document.getElementsByClassName('signup-container')[0];
            if(signupContainer.style.display == "block"){
                loginContainer.style.display = "block"
                signupContainer.style.display = "none"                
            }
            else{                                
                loginContainer.style.display = "none"
                signupContainer.style.display = "block"
            }
        }
        function setUser(username){
            localStorage.setItem("user", username);
            window.location.href = "./home.html";
        }
        if(localStorage.getItem("user"))
            window.location.href = "./home.html";
    </script>
    <body>
        <div class="login-signup-container">                        
            <div class="login-container">
                <h2 align="center">Sign In</h2>
                <form method="post" action="login.php" class="login-form">
                    <input type="text" name="username" placeholder="Username"/>
                    <input type="password" name="password" placeholder="Password"/>
                    <input type="text" name="isLoginOrSignup" value="login" hidden/>
                    <button type="submit" class="submit-button">SIGN IN</button>
                </form>
                <button class="signup-login-toggle" onclick="toggleLoginSignup()" type="button">Click here to signup</button>
            </div>            
            <div class="signup-container">
                <h2 align="center">Sign Up</h2>
                <form method="post" action="login.php" class="signup-form" id="signup-form">
                    <input type="email" name="email" placeholder="Email"/>
                    <input type="text" name="username" placeholder="Username"/>
                    <input type="password" name="password" placeholder="Password"/>
                    <input type="password" name="repeatPassword" placeholder="Repeat Password"/>
                    <input type="text" name="isLoginOrSignup" value="signup" hidden/>
                    <button type="submit" class="submit-button">SIGN UP</button>                    
                </form>                
                <button class="signup-login-toggle" onclick="toggleLoginSignup()" type="button">Click here to login</button>
            </div>
        </div>                
    </body>
</html>

<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = 'users';

    function login(){
        $conn = new mysqli($GLOBALS['servername'], $GLOBALS['username'], $GLOBALS['password'], $GLOBALS['dbname']);
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        $username = $_POST["username"];
        $password = $_POST["password"];
        $sql = "SELECT * FROM myusers WHERE username = '$username' AND password = '$password'";
        if (mysqli_num_rows(mysqli_query($conn, $sql))) {
            echo "<script>setUser('".$username."');</script>";
        } else {
            echo "<script>alert('Incorrect credentials')</script>";
        }
        
    }

    function signup(){
        $conn = new mysqli($GLOBALS['servername'], $GLOBALS['username'], $GLOBALS['password'], $GLOBALS['dbname']);
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        $username = $_POST["username"];
        $email = $_POST["email"];
        $password = $_POST["password"];        
        $sql = "SELECT * from myusers WHERE username = '$username'";
        if (mysqli_num_rows(mysqli_query($conn, $sql))) {            
            echo "<script>alert('Username already taken')</script>";
            exit();                      
        }                
        $sql = "SELECT * from myusers WHERE emailid = '$email'";
        if (mysqli_num_rows(mysqli_query($conn, $sql))) {            
            echo "<script>alert('An account with this email already exists')</script>";
            exit();
        }                
        $sql = "INSERT INTO myusers VALUES ('$email', '$username', '$password', '{}', '[]', '[]')";
        if(mysqli_query($conn, $sql)){            
            echo "<script>alert('Succesfully signed up!')</script>";
        } else{            
            echo "<script>alert('" . mysqli_error($conn) . "')</script>";            
        }                    

    }
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $isLoginOrSignup = $_POST['isLoginOrSignup'];
        if($isLoginOrSignup == 'login'){
            login();
        }
        else if($isLoginOrSignup == 'signup'){
            signup();
        }        
    }            
?>