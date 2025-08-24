<?php
require __DIR__ . '/config.php';
$pdo = db();

$id = isset($_GET['id']) ? (int)$_GET['id'] : null;

if ($id) {
    $stmt = $pdo->prepare("SELECT id, name, address, tel, description FROM bars WHERE id = ?");
    $stmt->execute([$id]);
    $bar = $stmt->fetch();
    if (!$bar) json_error('Bar not found', 404);

    $bar = [
        'id'          => (int)$bar['id'],
        'name'        => $bar['name'],
        'address'     => $bar['address'],
        'tel'         => $bar['tel'],
        'description' => $bar['description'],
    ];

    // この BAR のイベント
    $ev = $pdo->prepare("SELECT id, title, date, image_url, detail FROM events WHERE bar_id = ? ORDER BY date DESC");
    $ev->execute([$id]);
    $events = [];
    while ($row = $ev->fetch()) {
        $events[] = [
            'id'       => (int)$row['id'],
            'title'    => $row['title'],
            'date'     => date(DATE_ATOM, strtotime($row['date'])),
            'imageUrl' => $row['image_url'],
            'detail'   => $row['detail'],
        ];
    }
    $bar['events'] = $events;

    json_ok($bar);
}

// 一覧
$stmt = $pdo->query("SELECT id, name, address, tel, description FROM bars ORDER BY id DESC");
$bars = [];
while ($row = $stmt->fetch()) {
    $bars[] = [
        'id'          => (int)$row['id'],
        'name'        => $row['name'],
        'address'     => $row['address'],
        'tel'         => $row['tel'],
        'description' => $row['description'],
    ];
}
json_ok($bars);
