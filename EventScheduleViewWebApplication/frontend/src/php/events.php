<?php
require __DIR__ . '/config.php';
$pdo = db();

$id     = isset($_GET['id']) ? (int)$_GET['id'] : null;
$limit  = isset($_GET['limit']) ? max(1, min(100, (int)$_GET['limit'])) : 50;
$offset = isset($_GET['offset']) ? max(0, (int)$_GET['offset']) : 0;

if ($id) {
    $stmt = $pdo->prepare("
        SELECT
            e.id, e.title, e.date, e.image_url, e.detail, e.bar_id, e.user_id, e.created_at,
            b.id AS b_id, b.name AS b_name, b.address AS b_address, b.tel AS b_tel, b.description AS b_description
        FROM events e
        JOIN bars b ON e.bar_id = b.id
        WHERE e.id = ?
    ");
    $stmt->execute([$id]);
    $row = $stmt->fetch();
    if (!$row) json_error('Event not found', 404);

    $event = [
        'id'        => (int)$row['id'],
        'title'     => $row['title'],
        'date'      => date(DATE_ATOM, strtotime($row['date'])),
        'imageUrl'  => $row['image_url'],
        'detail'    => $row['detail'],
        'barId'     => (int)$row['bar_id'],
        'userId'    => (int)$row['user_id'],
        'createdAt' => date(DATE_ATOM, strtotime($row['created_at'])),
        'bar'       => [
            'id'          => (int)$row['b_id'],
            'name'        => $row['b_name'],
            'address'     => $row['b_address'],
            'tel'         => $row['b_tel'],
            'description' => $row['b_description'],
        ],
        // Front が event.djs.map(d => d.dj.name) を前提にしているため、{ dj: {...} } で返す
        'djs'       => [],
    ];

    $djStmt = $pdo->prepare("
        SELECT
            ed.id AS event_dj_id, ed.dj_id,
            d.id AS d_id, d.name, d.genre, d.profile
        FROM event_djs ed
        JOIN djs d ON ed.dj_id = d.id
        WHERE ed.event_id = ?
        ORDER BY ed.id
    ");
    $djStmt->execute([$id]);
    while ($dj = $djStmt->fetch()) {
        $event['djs'][] = [
            'id'   => (int)$dj['event_dj_id'],
            'djId' => (int)$dj['dj_id'],
            'dj'   => [
                'id'      => (int)$dj['d_id'],
                'name'    => $dj['name'],
                'genre'   => $dj['genre'],
                'profile' => $dj['profile'],
            ],
        ];
    }

    json_ok($event);
}

// 一覧
$stmt = $pdo->prepare("
    SELECT
        e.id, e.title, e.date, e.image_url, e.detail, e.bar_id, e.user_id, e.created_at,
        b.id AS b_id, b.name AS b_name, b.address AS b_address, b.tel AS b_tel, b.description AS b_description
    FROM events e
    JOIN bars b ON e.bar_id = b.id
    ORDER BY e.date DESC
    LIMIT ? OFFSET ?
");
$stmt->bindValue(1, $limit, PDO::PARAM_INT);
$stmt->bindValue(2, $offset, PDO::PARAM_INT);
$stmt->execute();

$events   = [];
$eventIds = [];
while ($row = $stmt->fetch()) {
    $eventIds[] = (int)$row['id'];
    $events[$row['id']] = [
        'id'        => (int)$row['id'],
        'title'     => $row['title'],
        'date'      => date(DATE_ATOM, strtotime($row['date'])),
        'imageUrl'  => $row['image_url'],
        'detail'    => $row['detail'],
        'barId'     => (int)$row['bar_id'],
        'userId'    => (int)$row['user_id'],
        'createdAt' => date(DATE_ATOM, strtotime($row['created_at'])),
        'bar'       => [
            'id'          => (int)$row['b_id'],
            'name'        => $row['b_name'],
            'address'     => $row['b_address'],
            'tel'         => $row['b_tel'],
            'description' => $row['b_description'],
        ],
        'djs'       => [],
    ];
}

if (!$events) json_ok([]);

// まとめて DJ を付与
$in = implode(',', array_fill(0, count($eventIds), '?'));
$dq = $pdo->prepare("
    SELECT
        ed.id AS event_dj_id, ed.event_id, ed.dj_id,
        d.id AS d_id, d.name, d.genre, d.profile
    FROM event_djs ed
    JOIN djs d ON ed.dj_id = d.id
    WHERE ed.event_id IN ($in)
    ORDER BY ed.event_id, ed.id
");
foreach ($eventIds as $i => $eid) {
    $dq->bindValue($i + 1, $eid, PDO::PARAM_INT);
}
$dq->execute();

while ($dj = $dq->fetch()) {
    $eid = (int)$dj['event_id'];
    $events[$eid]['djs'][] = [
        'id'   => (int)$dj['event_dj_id'],
        'djId' => (int)$dj['dj_id'],
        'dj'   => [
            'id'      => (int)$dj['d_id'],
            'name'    => $dj['name'],
            'genre'   => $dj['genre'],
            'profile' => $dj['profile'],
        ],
    ];
}

json_ok(array_values($events));
