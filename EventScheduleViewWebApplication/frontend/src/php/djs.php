<?php
require __DIR__ . '/config.php';
$pdo = db();

$id = isset($_GET['id']) ? (int)$_GET['id'] : null;

if ($id) {
    $stmt = $pdo->prepare("SELECT id, name, genre, profile FROM djs WHERE id = ?");
    $stmt->execute([$id]);
    $dj = $stmt->fetch();
    if (!$dj) json_error('DJ not found', 404);

    $dj = [
        'id'      => (int)$dj['id'],
        'name'    => $dj['name'],
        'genre'   => $dj['genre'],
        'profile' => $dj['profile'],
    ];

    // この DJ が出演するイベント
    $ev = $pdo->prepare("
        SELECT
            e.id, e.title, e.date, e.image_url, e.detail,
            b.id AS bar_id, b.name AS bar_name
        FROM event_djs ed
        JOIN events e ON ed.event_id = e.id
        JOIN bars b   ON e.bar_id = b.id
        WHERE ed.dj_id = ?
        ORDER BY e.date DESC
    ");
    $ev->execute([$id]);

    $events = [];
    while ($row = $ev->fetch()) {
        $events[] = [
            'id'       => (int)$row['id'],
            'title'    => $row['title'],
            'date'     => date(DATE_ATOM, strtotime($row['date'])),
            'imageUrl' => $row['image_url'],
            'detail'   => $row['detail'],
            'bar'      => [
                'id'   => (int)$row['bar_id'],
                'name' => $row['bar_name'],
            ],
        ];
    }
    $dj['events'] = $events;

    json_ok($dj);
}

// 一覧
$stmt = $pdo->query("SELECT id, name, genre, profile FROM djs ORDER BY id DESC");
$djs = [];
while ($row = $stmt->fetch()) {
    $djs[] = [
        'id'      => (int)$row['id'],
        'name'    => $row['name'],
        'genre'   => $row['genre'],
        'profile' => $row['profile'],
    ];
}
json_ok($djs);
