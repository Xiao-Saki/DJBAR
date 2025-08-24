import React, { useState } from 'react';
import { Box, Button, Heading, Input, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Register: React.FC = () => {
  const nav = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || '登録に失敗しました');

      // 登録後に自動ログイン
      await login(email, password);
      nav('/events');
    } catch (e: any) {
      setErr(e.message ?? '登録に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      minH="100vh"
      bg="#fafafa"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={4}
    >
      <Box bg="white" border="1px solid #eee" borderRadius="16px" p={6} w="100%" maxW="460px">
        <Heading as="h1" fontSize="xl" mb={4}>
          新規登録
        </Heading>
        <form onSubmit={onSubmit}>
          <Box mb={3}>
            <Text fontSize="sm" mb={1}>
              メールアドレス
            </Text>
            <Input value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
          </Box>
          <Box mb={3}>
            <Text fontSize="sm" mb={1}>
              表示名（任意）
            </Text>
            <Input value={name} onChange={(e) => setName(e.currentTarget.value)} />
          </Box>
          <Box mb={4}>
            <Text fontSize="sm" mb={1}>
              パスワード
            </Text>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
          </Box>
          {err && (
            <Text color="red.500" fontSize="sm" mb={3}>
              {err}
            </Text>
          )}
          <Button type="submit" colorScheme="teal" width="100%" disabled={loading}>
            {loading ? '送信中...' : '登録する'}
          </Button>
        </form>
        <Box mt={4} textAlign="center">
          <a href="/events" style={{ color: '#0d9488' }}>
            ← 一覧へ戻る
          </a>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
