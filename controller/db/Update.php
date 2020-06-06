<?php
require __DIR__ . "./../DbHandler.php";

use Db\DbHandler;

$id = (int)$_POST['id'];
$wins = (int)$_POST['wins'];
$loss = (int)$_POST['loss'];

$db = new DbHandler();
$db->update("UPDATE fighters SET wins = '$wins', loss = '$loss' WHERE id = '$id'");