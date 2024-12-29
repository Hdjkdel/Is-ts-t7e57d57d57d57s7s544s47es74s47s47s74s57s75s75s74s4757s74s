<?php
$dataFile = "userData.json";
$input = json_decode(file_get_contents("php://input"), true);

if (isset($input['ip'])) {
  $data = json_decode(file_get_contents($dataFile), true);
  foreach ($data as &$user) {
    if ($user['ip'] === $input['ip']) {
      $user['isBlocked'] = false;
      break;
    }
  }
  file_put_contents($dataFile, json_encode($data));
  echo "success";
}
?>