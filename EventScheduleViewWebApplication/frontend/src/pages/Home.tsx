import { Box, Flex, Heading, Text, Button, SimpleGrid, Image, Container } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import Header from '../components/Header';
import { useEffect, useState } from 'react';
import { getJSON } from '../lib/api';

type EventItem = { id:number; title:string; date:string; imageUrl?:string; bar:{ id:number; name:string } };

export default function Home() {
  const [events, setEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    getJSON<EventItem[]>("/event")
      .then((data) => setEvents(data.slice(0, 6)))
      .catch(console.error);
  }, []);

export default function Home() {
  return (
    <Box bg="black" color="white" minH="100vh">
      <Header />

      {/* ヒーロー */}
      <Box
        bgImage="url('/hero_bg.jpg')"
        bgSize="cover"
        bgPos="center"
        bgRepeat="no-repeat"
        py={{ base: 10, md: 16 }}
        px={4}
        borderBottom="1px solid"
        borderColor="whiteAlpha.200"
      >
        <Container maxW="6xl">
          <Heading fontSize={{ base: '2xl', md: '4xl' }} fontFamily="serif" letterSpacing="wide">
            DJ BAR EVENT PORTAL
          </Heading>
          <Text mt={3} color="whiteAlpha.800">
            アイフライヤー風のイベント紹介サイト（バー / DJ / イベント）
          </Text>

          <Flex gap={3} mt={6}>
            <RouterLink to="/events">
              <Button colorScheme="teal">イベントを見る</Button>
            </RouterLink>
            <RouterLink to="/djs">
              <Button variant="outline" colorScheme="teal">
                DJを見る
              </Button>
            </RouterLink>
          </Flex>
        </Container>
      </Box>

      {/* 今後の注目イベント */}
      <Container maxW="6xl" py={10}>
        <Heading
          as="h2"
          size="md"
          mb={6}
          borderLeft="4px solid"
          borderColor="pink.400"
          pl={3}
          letterSpacing="tight"
        >
          今後の注目イベント
        </Heading>

        {/* spacing -> gap に変更 */}
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={8}>
          {events.map((e) => (
            <RouterLink key={e.id} to={`/events/${e.id}`}>
              <Box
                role="group"
                rounded="2xl"
                overflow="hidden"
                bg="whiteAlpha.100"
                boxShadow="xl"
                _hover={{ transform: 'translateY(-4px) scale(1.02)', boxShadow: '2xl' }}
                transition="all 0.25s ease"
              >
                <Image
                  src={e.image}
                  alt={e.title}
                  w="100%"
                  h="220px"
                  objectFit="cover"
                  _groupHover={{ filter: 'brightness(1.05)' }}
                  transition="filter 0.25s"
                />
                <Box position="relative" p={4}>
                  <Text color="pink.300" fontSize="xs" fontWeight="bold">
                    {e.date}
                  </Text>

                  {/* Heading に noOfLines は使えないので Text で lineClamp */}
                  <Text as="h3" fontSize="lg" fontWeight="bold" mt={1} lineClamp={2}>
                    {e.title}
                  </Text>

                  <Text color="whiteAlpha.800" fontSize="sm" mt={1}>
                    {e.bar}
                  </Text>
                </Box>
              </Box>
            </RouterLink>
          ))}
        </SimpleGrid>
      </Container>

      <Box
        as="footer"
        borderTop="1px solid"
        borderColor="whiteAlpha.200"
        py={6}
        textAlign="center"
        color="whiteAlpha.700"
      >
        &copy; 2025 DJ BAR EVENT PORTAL
      </Box>
    </Box>
  );
}
