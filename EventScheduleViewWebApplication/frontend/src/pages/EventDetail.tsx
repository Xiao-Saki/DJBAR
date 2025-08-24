import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Heading, Text, Spinner } from '@chakra-ui/react';
import { fetchJson } from '../lib/api';

type DJ = { id: number; name: string };
type EventDJ = { id: number; djId?: number; dj?: DJ };
type Bar = { id: number; name: string };
type Event = {
  id: number;
  title: string;
  date: string;
  detail?: string;
  bar: Bar;
  djs: EventDJ[];
};

export default function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchJson<Event>(`/events/${id}`)
      .then(setEvent)
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <Box p={8}>
        <Spinner /> Loading...
      </Box>
    );
  if (err)
    return (
      <Box p={8} color="red.500">
        Error: {err}
      </Box>
    );
  if (!event) return <Box p={8}>データがありません</Box>;

  return (
    <Box p={8}>
      <Heading>{event.title}</Heading>
      <Text color="gray.600">{new Date(event.date).toLocaleString()}</Text>
      <Text mt={2}>
        会場：<Link to={`/bars/${event.bar.id}`}>{event.bar.name}</Link>
      </Text>
      <Text mt={2}>
        出演DJ：
        {event.djs?.map((x, i) => {
          const label = x.dj?.name ?? (x.djId ? `DJ #${x.djId}` : 'DJ');
          return (
            <span key={x.id ?? `${x.djId}-${i}`}>
              <Link to={`/djs/${x.dj?.id ?? x.djId}`}>{label}</Link>
              {i < event.djs.length - 1 ? ', ' : ''}
            </span>
          );
        })}
      </Text>
      <Text mt={4}>{event.detail}</Text>
    </Box>
  );
}
