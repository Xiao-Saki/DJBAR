import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Heading, Text } from '@chakra-ui/react';

const API_URL = 'http://localhost:3001/bar';

const BarDetail: React.FC = () => {
  const { id } = useParams();
  const [bar, setBar] = useState<any>(null);

  useEffect(() => {
    fetch(`${API_URL}/${id}`)
      .then((res) => res.json())
      .then((data) => setBar(data));
  }, [id]);

  if (!bar) return <Text>Loading...</Text>;

  return (
    <Box p={8}>
      <Heading>{bar.name}</Heading>
      <Text>住所: {bar.address}</Text>
      <Text>電話番号: {bar.tel}</Text>
      <Text>紹介: {bar.description}</Text>
      {/* イベント一覧をここに出すことも可 */}
    </Box>
  );
};

export default BarDetail;
