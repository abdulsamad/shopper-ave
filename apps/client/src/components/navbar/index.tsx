import React, { useState } from 'react';
import Link from 'next/link';
import {
  createStyles,
  Burger,
  MediaQuery,
  Title,
  NavLink,
  Menu,
  Button,
  Card,
  Group,
  Text,
  Badge,
  Image,
} from '@mantine/core';
import { motion } from 'framer-motion';
import { ShoppingCartIcon, UserCircleIcon } from '@heroicons/react/24/outline';

import MobileNav from './MobileNav';

const useStyles = createStyles((theme) => ({
  navbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    padding: '0 3rem',

    [theme.fn.smallerThan('md')]: {
      padding: '0 2rem',
    },
  },
  burger: {
    color: theme.colors.gray['6'],
    marginRight: '0 !important',
  },
  title: {
    fontSize: theme.fontSizes.xl,
  },
  middleLinks: {
    display: 'flex',
    gap: '1rem',

    a: {
      textDecoration: 'none',
    },
  },
  rightLinks: {
    display: 'flex',
    gap: '0.1rem',
  },
  icon: {
    height: '1.5rem',
    width: '1.5rem',
    color: theme.primaryColor,
  },
}));

const Index = () => {
  const [opened, setOpened] = useState(false);
  const { classes } = useStyles();

  return (
    <motion.nav className={classes.navbar} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Title className={classes.title} order={1}>
        Shopper Ave
      </Title>
      <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
        <>
          <div className={classes.middleLinks}>
            <Link href="/" passHref>
              <NavLink variant="subtle" label="Home" active />
            </Link>
          </div>
          <div className={classes.rightLinks}>
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Button variant="subtle">
                  <ShoppingCartIcon className={classes.icon} />
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Text component="div" align="center">
                  My Cart
                </Text>
                <Button variant="outline" fullWidth>
                  Checkout
                </Button>
              </Menu.Dropdown>
            </Menu>
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Button variant="subtle">
                  <UserCircleIcon className={classes.icon} />
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item icon={<UserCircleIcon />}>Profile</Menu.Item>
                <Menu.Item icon={<UserCircleIcon />}>Settings</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>
        </>
      </MediaQuery>
      <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
        <Burger
          opened={opened}
          className={classes.burger}
          onClick={() => setOpened((open) => !open)}
          size="md"
          mr="xl"
        />
      </MediaQuery>
    </motion.nav>
  );
};

export default Index;
