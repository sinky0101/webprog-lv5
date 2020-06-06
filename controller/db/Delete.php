<?php
require __DIR__ . "./../DbHandler.php";

use Db\DbHandler;

$fighterId = $_GET['id'];

$db = new DbHandler();
$db->delete("$fighterId");