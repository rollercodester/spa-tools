import { Ref } from 'react';
import { forwardRef, useToken } from '@chakra-ui/react';
import { NavLink, NavLinkProps } from '@spa-tools/core-router';

interface NavLinkListItemProps extends Pick<NavLinkProps, 'anchorStyle' | 'href' | 'onClick' | 'route' | 'state'> {
  text: string;
}

export const NavLinkListItem = forwardRef(
  ({ text, ...navLinkProps }: NavLinkListItemProps, ref: Ref<HTMLLIElement>) => {
    const [staticColor] = useToken('colors', ['purple.500']);

    return (
      <li ref={ref} style={{ flex: 1, fontWeight: 500, whiteSpace: 'nowrap' }}>
        <NavLink {...navLinkProps} staticStyle={{ color: staticColor, fontWeight: 600, textDecoration: 'underline' }}>
          {text}
        </NavLink>
      </li>
    );
  }
);
