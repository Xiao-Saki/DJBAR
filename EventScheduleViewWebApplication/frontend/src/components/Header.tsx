import { Link } from 'react-router-dom';
import { Flex, Box, Button, IconButton, Avatar } from '@chakra-ui/react';
import { useAuth } from '../contexts/AuthContext'; // ←仮：ユーザー情報を管理してる場合

const Header: React.FC = () => {
  const { user, logout } = useAuth(); // userがnullなら未ログイン

  return (
    <Flex
      as="header"
      bg="white"
      w="100%"
      px={6}
      py={3}
      align="center"
      justify="space-between"
      boxShadow="md"
      position="sticky"
      top={0}
      zIndex={100}
    >
      {/* サイトロゴやタイトル */}
      <Box fontWeight="bold" fontSize="xl" as={Link} to="/" fontFamily="serif" color="teal.600">
        DJ BAR EVENTS
      </Box>

      {/* 右側：ログイン状態で切り替え */}
      {!user ? (
        <Button as={Link} to="/login" colorScheme="teal" variant="outline">
          ログイン
        </Button>
      ) : (
        <Flex align="center" gap={2}>
          {/* ユーザー名 or アバターなど */}
          <Avatar size="sm" name={user.name || 'User'} />
          {/* ログアウトアイコンやメニュー（必要なら） */}
          <Button size="sm" onClick={logout} colorScheme="gray" variant="ghost">
            ログアウト
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default Header;
