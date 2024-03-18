import { useEffect } from 'react';
import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  HStack,
  Heading,
  IconButton,
  Image,
  VStack,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react';
import { NavLink } from '@spa-tools/core-router';
import { routes } from 'showcase/router';
import { NavItems } from './nav-items';

const NAVBAR_HEIGHT = '5rem';

interface LayoutProps {
  children: React.ReactNode;
  isForHome?: boolean;
}

export function Layout({ children, isForHome }: LayoutProps) {
  const [isSmallScreen] = useMediaQuery('(max-width: 882px)');
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    if (!isSmallScreen && isOpen) {
      onClose();
    }
  }, [isOpen, isSmallScreen, onClose]);

  return (
    <>
      <VStack sx={{ alignItems: 'flex-start', gap: 0, height: isForHome ? '100%' : 'unset', width: '100%' }}>
        <HStack
          as='nav'
          sx={{
            borderBottom: '1px solid',
            borderBottomColor: '#bebebe',
            gap: '2rem',
            h: NAVBAR_HEIGHT,
            p: '1rem',
            width: '100%',
          }}
        >
          <HStack sx={{ flex: 1 }}>
            {isSmallScreen && (
              <IconButton aria-label='hamburger menu' onClick={onOpen} variant='ghost'>
                <HamburgerIcon boxSize='2rem' />
              </IconButton>
            )}
            <NavLink route={routes.homeRoute}>
              <HStack sx={{ alignItems: 'center', gap: '0.5rem' }}>
                <Image alt='Logo' src='/logo-black.png' sx={{ height: '3rem', minWidth: '4.3rem' }} />
                <Heading size='xl'>Live Demo</Heading>
              </HStack>
            </NavLink>
          </HStack>
          {!isSmallScreen && (
            <HStack as='ul' sx={{ alignContent: 'flex-start', gap: '1.5rem', listStyleType: 'none', mr: '1rem' }}>
              <NavItems />
            </HStack>
          )}
        </HStack>
        <Box
          sx={{
            flexGrow: 1,
            h: 'auto',
            maxH: `calc(100vh - ${NAVBAR_HEIGHT})`,
            overflowX: 'auto',
            overflowY: isForHome ? 'auto' : 'scroll',
            p: isForHome ? 0 : '1.5rem',
            width: '100%',
          }}
        >
          {children}
        </Box>
      </VStack>
      <Drawer isOpen={isOpen} onClose={onClose} placement='left'>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton sx={{ p: '0.5rem' }} />
          <DrawerBody as='nav' sx={{ mt: '2rem' }}>
            <VStack as='ul' onClick={onClose} sx={{ gap: '0.5rem', listStyleType: 'none' }}>
              <NavItems />
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
