import React from 'react';
import { Header, Text, MediaQuery, Burger, useMantineTheme } from '@mantine/core';

interface IProps {
  opened: boolean;
  toggleOpen: () => void;
}

const Index = ({ opened, toggleOpen }: IProps) => {
  const theme = useMantineTheme();

  return (
    <Header height={70} p="md">
      <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Burger
            opened={opened}
            onClick={toggleOpen}
            size="sm"
            color={theme.colors.gray[6]}
            mr="xl"
          />
        </MediaQuery>
        <Text>Shopper Ave</Text>
      </div>
    </Header>
  );
};

export default Index;
