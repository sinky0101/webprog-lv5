<?php
require __DIR__ . "./../DbHandler.php";

use Db\DbHandler;

$name = $_POST['name'];
$age = $_POST['age'];
$info = $_POST['info'];
$wins = $_POST['wins'];
$loss = $_POST['loss'];
$image = addslashes($_FILES['image']['tmp_name']);
$image = file_get_contents($image);
$image = base64_encode($image);

$db = new DbHandler();
$db->insert("INSERT INTO fighters(name, age, info, wins, loss, image) VALUES ('$name', '$age', '$info', '$wins', '$loss', '$image')");