import { useState } from 'react';
import { Box, Button, Input, Stack, Text } from '@chakra-ui/react';
import { useAuth } from '../contexts/AuthContext';

export default function LoginForm({ onSuccess }: { onSuccess?: () => void }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      await login(email, password);
      onSuccess?.();
    } catch (e: any) {
      setErr(e.message || 'ログインに失敗しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box as="form" onSubmit={submit} borderWidth="1px" borderRadius="lg" p={4}>
      <Stack gap={3}>
        <Input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {err && (
          <Text color="red.500" fontSize="sm">
            {err}
          </Text>
        )}
        {/* Chakra v3 は loading prop */}
        <Button type="submit" colorScheme="teal" loading={loading}>
          ログイン
        </Button>
      </Stack>
    </Box>
  );
}
