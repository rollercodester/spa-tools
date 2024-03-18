import { Text, VStack } from '@chakra-ui/react';
import { TbRouteSquare } from 'react-icons/tb';
import { DemoViewport, logLabel } from 'showcase/widgets';
import { myRoutes } from '../common';

export function RouteFactoryTabPanel() {
  return (
    <DemoViewport
      code={code}
      ctaContent='Run Route Factory Demo'
      ctaIcon={<TbRouteSquare fontSize='1.75rem' />}
      headingContent={
        <VStack sx={{ alignItems: 'flex-start', gap: '1rem' }}>
          <Text>
            Creating routes is easy-peasy! Best of all, because <em>you</em> determine what a route actually is, your
            application&apos;s navigation logic is only limited by your imagination.
          </Text>
          <Text sx={{ fontWeight: 'normal' }}>
            And if you use Typescript, you&apos;ll get automatic intellisense for all your routes including the props
            you defined on your custom route definition.
          </Text>
        </VStack>
      }
      initialOutputMessage='Click the "Run Route Factory Demo" button to execute the demo...'
      language='ts'
      onClickCtaButton={() => {
        logLabel('Routes we just created:');
        console.log(myRoutes);

        logLabel('Members Only route requires auth check:');
        console.log(myRoutes.membersOnlyRoute.authCheck);

        logLabel('Sign-up route requires dirty check:');
        console.log(myRoutes.signupRoute.dirtyCheck);

        logLabel('Login route requires auth check:');
        console.log(myRoutes.loginRoute.authCheck);
      }}
    />
  );
}

//
//
// DISPLAY CODE
//
//

const code = `import { CoreRoute, routesFactory } from '@spa-tools/core-router';

interface MyCustomRoute extends CoreRoute {
  authCheck: boolean;
  dirtyCheck: boolean;
}

const createMyRoutes = routesFactory<MyCustomRoute>();

const myRoutes = createMyRoutes({
  aboutRoute: {
    authCheck: false,
    dirtyCheck: false,
    path: '/about',
  },
  homeRoute: {
    authCheck: false,
    dirtyCheck: false,
    path: '/',
  },
  loginRoute: {
    authCheck: false,
    dirtyCheck: false,
    path: '/login',
  },
  membersOnlyRoute: {
    authCheck: true,
    dirtyCheck: false,
    path: '/members-only',
  },
  signupRoute: {
    authCheck: false,
    dirtyCheck: true,
    path: '/signup',
  },
});

console.log('Routes we just created:');
console.log(myRoutes);

// with Typescript, we get intellisense on all of the following dot-notation props
// (even the custom props) which makes implementing navigation logic in your app a breeze

console.log('Members Only route requires auth check:');
console.log(myRoutes.membersOnlyRoute.authCheck);

console.log('Sign-up route requires dirty check:');
console.log(myRoutes.signupRoute.dirtyCheck);

console.log('Login route requires auth check:');
console.log(myRoutes.loginRoute.authCheck);
`;
