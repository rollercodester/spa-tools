import { Divider, useMediaQuery } from '@chakra-ui/react';
import { routes } from 'showcase/router';
import { NavLinkListItem } from './nav-link-list-item';

export function NavItems() {
  const [isSmallScreen] = useMediaQuery('(max-width: 882px)');

  return (
    <>
      <NavLinkListItem route={routes.apiClientRoute} text='API Client' />
      <NavLinkListItem route={routes.routerRoute} text='Core Router' />
      <NavLinkListItem route={routes.runtimeConfigRoute} text='Runtime Config' />
      <NavLinkListItem route={routes.reactHooksRoute} text='Interaction Hooks' />
      <NavLinkListItem route={routes.utilsRoute} text='Utilities' />
      {!isSmallScreen && <Divider orientation='vertical' sx={{ borderColor: 'gray.500', height: '1.25rem' }} />}
      <NavLinkListItem href='https://rollercodester.github.io/spa-tools' text='Get Started' />
      <NavLinkListItem href='https://github.com/rollercodester/spa-tools' text='GitHub' />
    </>
  );
}
