import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Heading, Text } from '@chakra-ui/react';

const API_URL = 'http://localhost:3001/dj';

const DJDetail: React.FC = () => {
  const { id } = useParams();
  const [dj, setDj] = useState<any>(null);

  useEffect(() => {
    fetch(`${API_URL}/${id}`)
      .then((res) => res.json())
      .then((data) => setDj(data));
  }, [id]);

  if (!dj) return <Text>Loading...</Text>;

  return (
    <Box p={8}>
      <Heading>{dj.name}</Heading>
      <Text>ジャンル: {dj.genre}</Text>
      <Text>プロフィール: {dj.profile}</Text>
      {/* 出演イベントをここに出すことも可 */}
    </Box>
  );
};

export default DJDetail;
