import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Heading, Text, SimpleGrid } from '@chakra-ui/react';

type EventLite = {
  id: number;
  title: string;
  date: string;
};

type BarDetail = {
  id: number;
  name: string;
  address?: string;
  tel?: string;
  description?: string;
  events: EventLite[];
};

export default function BarDetail() {
  const { id } = useParams();
  const [bar, setBar] = useState<BarDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/bars/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => setBar(data))
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
  if (!bar) return <Box p={8}>データなし</Box>;

  return (
    <Box p={8}>
      <Heading mb={4} fontFamily="serif">
        {bar.name}
      </Heading>
      {bar.address && <Text>住所：{bar.address}</Text>}
      {bar.tel && <Text>TEL：{bar.tel}</Text>}
      {bar.description && <Text mt={2}>{bar.description}</Text>}

      <Heading size="md" mt={8} mb={4} fontFamily="serif">
        この会場のイベント
      </Heading>
      {bar.events.length === 0 ? (
        <Text>イベントはまだありません。</Text>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
          {bar.events.map((ev) => (
            <Box key={ev.id} borderWidth="1px" borderRadius="lg" p={4}>
              <Heading size="sm" mb={1}>
                <Link to={`/events/${ev.id}`}>{ev.title}</Link>
              </Heading>
              <Text fontSize="sm" color="gray.600">
                {new Date(ev.date).toLocaleString()}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}
