import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Heading, Text } from '@chakra-ui/react';

const API_URL = 'http://localhost:3001/event';

const EventDetail: React.FC = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<any>(null);

  useEffect(() => {
    fetch(`${API_URL}/${id}`)
      .then((res) => res.json())
      .then((data) => setEvent(data));
  }, [id]);

  if (!event) return <Text>Loading...</Text>;

  return (
    <Box p={8}>
      <Heading>{event.title}</Heading>
      <Text>日付: {new Date(event.date).toLocaleString()}</Text>
      <Text>会場: {event.bar?.name}</Text>
      <Text>出演DJ: {event.djs.map((dj: any) => dj.dj?.name || dj.djId).join(', ')}</Text>
      <Text mt={2}>{event.detail}</Text>
      {/* 画像とか、もっと情報を追加可 */}
    </Box>
  );
};
export default EventDetail;
