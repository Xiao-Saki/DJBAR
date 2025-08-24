import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Heading, Input, Text } from '@chakra-ui/react';
import { useAuth } from '../contexts/AuthContext';

const LoginDropdown: React.FC = () => {
  const { login } = useAuth();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // 外側クリックで閉じる
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    if (open) document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [open]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    const ok = await login(email, password);
    setLoading(false);
    if (ok) {
      setOpen(false);
      setEmail('');
      setPassword('');
    } else {
      setErr('メールまたはパスワードが正しくありません。');
    }
  };

  return (
    <Box position="relative" ref={wrapRef}>
      <Button onClick={() => setOpen((v) => !v)} variant="solid">
        ログイン
      </Button>

      {open && (
        <Box
          position="absolute"
          right={0}
          mt={2}
          bg="white"
          border="1px solid #e5e7eb"
          borderRadius="16px"
          boxShadow="0 10px 30px rgba(0,0,0,0.12)"
          w="300px"
          p={4}
          zIndex={20}
        >
          {/* 吹き出しの三角 */}
          <Box
            position="absolute"
            top="-6px"
            right="16px"
            w="12px"
            h="12px"
            bg="white"
            borderLeft="1px solid #e5e7eb"
            borderTop="1px solid #e5e7eb"
            transform="rotate(45deg)"
          />
          <Heading as="h3" fontSize="md" mb={3}>
            ログイン
          </Heading>
          <form onSubmit={onSubmit}>
            <Box mb={3}>
              <Text fontSize="sm" mb={1}>
                メールアドレス
              </Text>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                placeholder="you@example.com"
              />
            </Box>
            <Box mb={3}>
              <Text fontSize="sm" mb={1}>
                パスワード
              </Text>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                placeholder="••••••••"
              />
            </Box>
            {err && (
              <Text color="red.500" fontSize="sm" mb={2}>
                {err}
              </Text>
            )}
            <Button type="submit" colorScheme="teal" width="100%" disabled={loading}>
              {loading ? '送信中...' : 'ログイン'}
            </Button>
          </form>
          <Box mt={3}>
            <Text fontSize="xs" color="gray.600">
              アカウント未作成の方は
              <a href="/register" style={{ color: '#0d9488', marginLeft: 4 }}>
                新規登録へ
              </a>
            </Text>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default LoginDropdown;
