import CodeBlock from '@theme/CodeBlock';
import { SectionText } from '..';

export function CoreRouterGettingStartedReactJsCode() {
  return (
    <>
      <SectionText>The first thing to do is create/define your routes.</SectionText>
      <CodeBlock language='jsx'>
        {`import { reactRoutesFactory } from '@spa-tools/core-router';

// to create your routes, first generate a route factory function
const createMyRoutes = reactRoutesFactory();

// next define and create all of your routes, which you'll
// typically export to use throughout your app; note the use
// of JSX to define the component to render for each route
export const myRoutes = createMyRoutes({
  dashboardRoute: {
    component: <DashboardView />,
    path: '/',
    requiresAuth: true,
  },
  financialsRoute: {
    component: <FinancialsView />,
    path: '/financials',
    requiresAuth: true,
  },
  loginRoute: {
    component: <LoginView />,
    path: '/login',
    requiresAuth: false,
  },
  signupRoute: {
    component: <SignupView />,
    path: '/signup',
    requiresAuth: false,
  },
});`}
      </CodeBlock>
      <SectionText>Once you&apos;ve created your routes, next you create your router.</SectionText>
      <CodeBlock language='jsx'>
        {`import { CoreReactRouter } from '@spa-tools/core-router';
import { myRoutes } from '..';
import { checkUserAuthentication } from '..';

export function MyRouter() {
  //
  // onRouteRequest prop of the CoreReactRouter component is the
  // callback you use to perform all of your flow control logic
  // in one centalized location
  //
  // the controller scenarios are only limited by your
  // imagination, but ultimately this is where you determine
  // if the user's route request should be allowed to proceed
  // or if it should be denied or perhaps even redirected.
  //
  const handleRouteRequest = async ({ newRoute, newState }) => {
    // here we use our custom requiresAuth property to check
    // if the user must first be authenticated before allowing
    // navigation to the requested route
    if (newRoute.requiresAuth) {
      // here we call a so-called async function to determine
      // if the user is authenticated
      const isUserAuthenticated = await checkUserAuthentication();

      if (!isUserAuthenticated) {
        // since the user is NOT authenticated, we request a
        // redirect to the login route by returning a tuple with
        // respective route along with state we want to pass along
        return [
          myRoutes.loginRoute,
          { fromRoute: newRoute, fromState: newState }
        ]
      }
    }

    // here we ALLOW the route request by returning true; we also
    // could've done nothing and by default the route request would
    // be allowed to proceed
    return true;
  };

  return (
    // here we return a CoreReactRouter component
    <CoreReactRouter
      // here we assign our route request handler
      onRouteRequest={handleRouteRequest}
      // here we assign our routes
      routes={myRoutes}
    />
  );
}`}
      </CodeBlock>
      <SectionText>
        Finally, add your new router as a child to the root of your app tree. Of course we could also just use the
        CoreReactRouter component here directly instead of using a router wrapper component.
      </SectionText>
      <CodeBlock language='jsx'>
        {`import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { MyRouter } from '..';

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MyRouter />
  </StrictMode>
);`}
      </CodeBlock>
      <SectionText>
        Now you can navigate to any route from any function component in your app with the useCoreRouter hook.
      </SectionText>
      <CodeBlock language='tsx'>
        {`import { useCoreRouter } from '@spa-tools/core-router';
import { myRoutes } from '..';

function MyFinancialCta() {
  const { navigate } = useCoreRouter();

  return (
    <button onClick={() => navigate(myRoutes.financialsRoute)}>
      Go to Financials
    </button>
  );
}`}
      </CodeBlock>
      <SectionText>Or you can use the NavLink component.</SectionText>
      <CodeBlock language='jsx'>
        {`import { NavLink } from '@spa-tools/core-router';
import { myRoutes } from '..';

function MyLeftNavComponent() {
  return (
    <ul>
      <li>
        <NavLink route={myRoutes.financialsRoute}>Financials</NavLink>
      </li>
      <li>
        <NavLink route={myRoutes.dashboardRoute}>Dashboard</NavLink>
      </li>
    </ul>
  );
}`}
      </CodeBlock>
    </>
  );
}
