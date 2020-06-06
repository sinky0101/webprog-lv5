<?php
require __DIR__ . "./../DbHandler.php";

use Db\DbHandler;

$db = new DbHandler();
$result = $db->select("SELECT * FROM fighters");

$json = mysqli_fetch_all ($result, MYSQLI_ASSOC);
echo json_encode($json);