<?php
require __DIR__ . "./../DbHandler.php";

use Db\DbHandler;

$id = $_GET['id'];
$name = $_POST['name'];
$age = $_POST['age'];
$info = $_POST['info'];
$wins = $_POST['wins'];
$loss = $_POST['loss'];
$image = addslashes($_FILES['image']['tmp_name']);

$db = new DbHandler();
if ($image !== '')
{
    $image = file_get_contents($image);
    $image = base64_encode($image);

    $db->update("UPDATE fighters SET name = '$name', age = '$age', info = '$info',  wins = '$wins', loss = '$loss', image = '$image' WHERE id = '$id'");
}
else {
    $db->update("UPDATE fighters SET name = '$name', age = '$age', info = '$info',  wins = '$wins', loss = '$loss' WHERE id = '$id'");
}
