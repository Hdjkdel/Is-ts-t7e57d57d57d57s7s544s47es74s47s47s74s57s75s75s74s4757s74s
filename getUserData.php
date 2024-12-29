<?php
$dataFile = "userData.json";
if (file_exists($dataFile)) {
  $data = file_get_contents($dataFile);
  echo $data;
} else {
  echo json_encode([]);
}
?>