import { Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const RegisterButton = () => {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <RouterLink to="/events/new">
      <Button colorScheme="teal">イベントを登録</Button>
    </RouterLink>
  );
};

export default RegisterButton;
