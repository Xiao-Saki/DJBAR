import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const RegisterButton = () => {
  const { user } = useAuth();
  if (!user) return null;
  return (
    <Link to="/events/new">
      <Button colorScheme="teal">イベントを登録</Button>
    </Link>
  );
};

export default RegisterButton;
