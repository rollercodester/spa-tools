import { CSSProperties, DispatchWithoutAction, ReactNode, useContext } from 'react';
import { UnknownState } from '../core-router';
import { CoreReactRoute, CoreReactRouterContext } from './core-react-router';

/**
 * React component that renders a link to a route managed by a @spa-tools Core Router.
 */
export function NavLink({
  anchorStyle,
  children,
  hash,
  href,
  onClick,
  route,
  state,
  staticContent,
  staticStyle,
}: NavLinkProps) {
  const { activeRoute, navigate } = useContext(CoreReactRouterContext);
  const isActive = Array.isArray(route) ? (route as CoreReactRoute[]).includes(activeRoute!) : route === activeRoute;

  return isActive ? (
    <div style={{ cursor: 'default', ...staticStyle }}>{staticContent || children}</div>
  ) : (
    <a
      href={href}
      onClick={() => {
        if (onClick) {
          onClick();
          //
          // EARLY RETURN because consumer is handling navigation
          //
          return;
        }

        if (!route && !href) {
          console.error('WARNING: NavLink had no route, no href, and no onClick handler provided');
          //
          // EARLY RETURN because there's no route and no onClick handler
          //
          return;
        }

        if (Array.isArray(route)) {
          //
          // EARLY RETURN because when multiple routes provided, they purely determine active state
          //
          return;
        }

        if (route) {
          navigate(route, state || undefined, hash);
        }
      }}
      rel={href ? 'noopener noreferrer' : undefined}
      style={{ cursor: 'pointer', ...anchorStyle }}
      target={href ? '_blank' : undefined}
    >
      {children}
    </a>
  );
}

//
//
// types
//
//

export interface NavLinkProps {
  /**
   * Optional style to apply to the link's anchor element.
   */
  anchorStyle?: CSSProperties;
  /**
   * Content to render when the route is NOT active. This is where you would typically put a <Link> or <a> component.
   */
  children: ReactNode;
  /**
   * Optional hash to append to the route.
   */
  hash?: string;
  /**
   * Optional href that when provided will correspond to anchor element href property.
   */
  href?: string;
  /**
   * Optional handler to call when the link is clicked. If provided, the route will not be navigated to.
   */
  onClick?: DispatchWithoutAction;
  /**
   * Route to navigate to when the link is clicked unless the onClick handler is provided. If an array of routes is provided, the first route that matches the current route will be used to determine active state.
   */
  route?: CoreReactRoute | CoreReactRoute[];
  /**
   * Optional state to pass to the route.
   */
  state?: UnknownState;
  /**
   * Optional static content to render when the route is active. You can use this if you don't want an active link to be clickable. If not provided, then the `children` will be used when the route is active.
   */
  staticContent?: ReactNode;
  /**
   * Optional style to apply to the static content's parent div when the route is active.
   */
  staticStyle?: CSSProperties;
}
