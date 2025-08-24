import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import { Box } from '@chakra-ui/react';

const DefaultLayout: React.FC = () => {
  return (
    <Box>
      <Header />
      <Box as="main">
        <Outlet />
      </Box>
    </Box>
  );
};

export default DefaultLayout;
