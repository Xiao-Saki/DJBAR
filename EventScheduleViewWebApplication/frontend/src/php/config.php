<?php
define('DB_HOST', 'localhost');     // 例: 'localhost'
define('DB_NAME', 'ando2event_cms');  // 例: 'example_com_db'
define('DB_USER', 'ando2event_admin');  // 例: 'example_user'
define('DB_PASS', 'komi2022ver');  // 例: 'secretpass');
define('DB_CHARSET', 'utf8mb4');

// PDOを返す関数（型宣言なし）
function pdo() {
  static $pdo = null;
  if ($pdo) return $pdo;

  $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=' . DB_CHARSET;
  $opt = array(
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
  );
  $pdo = new PDO($dsn, DB_USER, DB_PASS, $opt);
  return $pdo;
}
