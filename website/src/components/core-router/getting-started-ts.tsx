import CodeBlock from '@theme/CodeBlock';
import { SectionText } from '..';

export function CoreRouterGettingStartedTsCode() {
  return (
    <>
      <SectionText>The first thing to do is create/define your routes.</SectionText>
      <CodeBlock language='ts'>
        {`import { CoreRoute, routesFactory } from '@spa-tools/core-router';

// adding custom properties to your routes is as simple
// as creating an interface that extends CoreRoute
interface MyCustomRoute extends CoreRoute {
  requiresAuth: boolean;
}

// to create your routes, first generate a route factory function
const createMyRoutes = routesFactory<MyCustomRoute>();

// next define and create all of your routes, which you'll
// typically export to use throughout your app
export const myRoutes = createMyRoutes({
  dashboardRoute: {
    path: '/',
    requiresAuth: true,
  },
  financialsRoute: {
    path: '/financials',
    requiresAuth: true,
  },
  loginRoute: {
    path: '/login',
    requiresAuth: false,
  },
  signupRoute: {
    path: '/signup',
    requiresAuth: false,
  },
});`}
      </CodeBlock>
      <SectionText>Once you&apos;ve created your routes, next you initialize your router.</SectionText>
      <CodeBlock language='ts'>
        {`import { CoreRouter } from '@spa-tools/core-router';
import { myRoutes } from '..';
import { checkUserAuthentication } from '..';

export const myRouter = CoreRouter.initialize(myRoutes, {
  //
  // onRouteRequest is the callback you use to perform all
  // of your flow control logic in one centalized location
  //
  // the controller scenarios are only limited by your
  // imagination, but ultimately this is where you determine
  // if the user's route request should be allowed to proceed
  // or if it should be denied or perhaps even redirected.
  //
  onRouteRequest: async ({ newRoute, newState }) => {
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
  }
});`}
      </CodeBlock>
      <SectionText>Now you can use your router from anywhere in your app to navigate to any route.</SectionText>
      <CodeBlock language='ts'>
        {`import { myRouter, myRoutes } from '..';

function navigateToFinanicals() {
  myRouter.navigate(myRoutes.financialsRoute);
}`}
      </CodeBlock>
    </>
  );
}
