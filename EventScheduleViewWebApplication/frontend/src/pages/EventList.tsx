import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, Image, SimpleGrid } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import RegisterButton from '../components/RegisterButton';

type Bar = {
  id: number;
  name: string;
  address: string;
  tel: string;
  description?: string;
};

type DJ = {
  id: number;
  name: string;
  genre?: string;
  profile?: string;
};

type EventDJ = {
  id: number;
  dj: DJ;
};

type Event = {
  id: number;
  title: string;
  date: string;
  detail?: string;
  bar: Bar;
  djs: EventDJ[];
};

const API_URL = 'http://localhost:3001/event';

const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  return (
    <Box bg="#fff" minH="100vh" py={12}>
      <Heading
        as="h1"
        fontSize={['2xl', '4xl']}
        fontWeight="bold"
        letterSpacing="wide"
        mb={10}
        color="black"
        textAlign="center"
        fontFamily="serif"
      >
        DJ BAR EVENTS
      </Heading>
      <RegisterButton />
      <SimpleGrid columns={[1, 2, 3]} gap={10} px={[2, 4, 16]}>
        {events.map((event) => (
          <Box
            key={event.id}
            bg="#f8f8f8"
            borderRadius="2xl"
            overflow="hidden"
            boxShadow="lg"
            transition="all 0.2s"
            _hover={{ boxShadow: '2xl', transform: 'translateY(-4px) scale(1.03)' }}
          >
            {/* 画像（今はダミー） */}
            <Image
              src="/sample_event1.jpg"
              alt="イベント画像"
              objectFit="cover"
              w="100%"
              h="220px"
            />
            <Box p={5}>
              <Heading fontSize="xl" mb={2} fontFamily="serif">
                <Link to={`/events/${event.id}`}>{event.title}</Link>
              </Heading>
              <Text fontSize="sm" color="gray.500">
                {new Date(event.date).toLocaleString()}
              </Text>
              <Text fontWeight="bold" mt={2}>
                {/* バー名をリンクに */}
                <Link to={`/bars/${event.bar.id}`}>{event.bar.name}</Link>
              </Text>
              <Text mt={1} fontSize="sm" color="gray.600">
                出演DJ:{' '}
                {event.djs.map((djObj, idx) => (
                  <span key={djObj.dj.id}>
                    <Link to={`/djs/${djObj.dj.id}`}>{djObj.dj.name}</Link>
                    {idx !== event.djs.length - 1 && ', '}
                  </span>
                ))}
              </Text>
              <Text lineClamp={2} mt={2}>
                {event.detail}
              </Text>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default EventList;
