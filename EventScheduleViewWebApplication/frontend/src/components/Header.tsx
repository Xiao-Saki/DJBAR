import { Flex, Box, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const { user } = useAuth();
  const initial = (user?.name || 'U').slice(0, 1).toUpperCase();

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      px={6}
      py={4}
      bg="white"
      borderBottom="1px solid"
      borderColor="gray.200"
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Box fontWeight="bold" fontSize="xl" fontFamily="serif" color="teal.600">
        <RouterLink to="/">DJ BAR EVENTS</RouterLink>
      </Box>

      <Flex align="center" gap={3}>
        {!user ? (
          <RouterLink to="/login">
            <Button colorScheme="teal" variant="outline">
              ログイン
            </Button>
          </RouterLink>
        ) : (
          <Flex align="center" gap={3}>
            <RouterLink to="/events/new">
              <Button variant="ghost">登録</Button>
            </RouterLink>
            {/* Avatar 代替（シンプルな丸アイコン） */}
            <Box
              w="32px"
              h="32px"
              borderRadius="full"
              bg="teal.500"
              color="white"
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontSize="sm"
            >
              {initial}
            </Box>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default Header;
