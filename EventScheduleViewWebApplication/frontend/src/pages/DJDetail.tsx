import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Heading, Text, SimpleGrid } from '@chakra-ui/react';

type EventLite = {
  id: number;
  title: string;
  date: string;
  bar?: { id: number | null; name: string | null };
};

type DJDetailT = {
  id: number;
  name: string;
  genre?: string;
  profile?: string;
  events: EventLite[];
};

export default function DJDetail() {
  const { id } = useParams();
  const [dj, setDj] = useState<DJDetailT | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/djs/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => setDj(data))
      .catch((e) => setErr(`読み込み失敗: ${e.message}`))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Box p={8}>Loading...</Box>;
  if (err)
    return (
      <Box p={8} color="red.600">
        {err}
      </Box>
    );
  if (!dj) return <Box p={8}>データなし</Box>;

  return (
    <Box p={8}>
      <Heading mb={2} fontFamily="serif">
        {dj.name}
      </Heading>
      {dj.genre && <Text>ジャンル：{dj.genre}</Text>}
      {dj.profile && <Text mt={2}>{dj.profile}</Text>}

      <Heading size="md" mt={8} mb={4} fontFamily="serif">
        出演イベント
      </Heading>
      {dj.events.length === 0 ? (
        <Text>出演イベントはまだありません。</Text>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
          {dj.events.map((ev) => (
            <Box key={ev.id} borderWidth="1px" borderRadius="lg" p={4}>
              <Heading size="sm" mb={1}>
                <Link to={`/events/${ev.id}`}>{ev.title}</Link>
              </Heading>
              <Text fontSize="sm" color="gray.600">
                {new Date(ev.date).toLocaleString()}
              </Text>
              <Text fontSize="sm" mt={1}>
                会場：{ev.bar?.name ?? '不明'}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}
