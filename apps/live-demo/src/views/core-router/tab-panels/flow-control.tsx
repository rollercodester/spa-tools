import { useState } from 'react';
import { Code, HStack, Radio, RadioGroup, Text, VStack } from '@chakra-ui/react';
import { useCoreRouter } from '@spa-tools/core-router';
import { BsController } from 'react-icons/bs';
import { routes } from 'showcase/router';
import { DemoViewport } from 'showcase/widgets';

export type FlowControlDemo = 'Deny Flow' | 'Confirm Flow' | 'Redirect Flow';

interface FlowControlTabPanelProps {
  activeDemo?: string;
}

export function FlowControlTabPanel({ activeDemo }: FlowControlTabPanelProps) {
  const [demo, setDemo] = useState<FlowControlDemo>(activeDemo ? (activeDemo as FlowControlDemo) : 'Deny Flow');
  const { navigate } = useCoreRouter();

  const RadioOptions = () => (
    <RadioGroup
      colorScheme='purple'
      onChange={(value) => {
        const newDemo = value as FlowControlDemo;
        setDemo(newDemo);
      }}
      value={demo}
    >
      <HStack sx={{ gap: '0.75rem' }}>
        <Radio value='Deny Flow'>Deny Route Request</Radio>
        <Radio value='Confirm Flow'>Confirm Route Request</Radio>
        <Radio value='Redirect Flow'>Redirect to Home</Radio>
      </HStack>
    </RadioGroup>
  );

  return (
    <DemoViewport
      code={CODE[demo]}
      codeOnly
      ctaContent={
        <>
          Run the selected
          <br />
          Flow Control Demo
        </>
      }
      ctaIcon={<BsController fontSize='1.75rem' />}
      headingContent={
        <VStack sx={{ alignItems: 'flex-start', gap: '1rem' }}>
          <Text>
            There are many scenarios where an application needs to make decisions for route navigation and act
            accordingly.
          </Text>
          <Text sx={{ fontWeight: 'normal', lineHeight: 1.5 }}>
            To meet these inevitable requirements, the Core Router gives complete flow control to the consuming
            application via the <Code>onRouteRequest</Code> callback option.
          </Text>
        </VStack>
      }
      inputWidget={<RadioOptions />}
      language='ts'
      onClickCtaButton={() => {
        navigate(
          routes.flowDemoRoute,
          { fromDemoPath: routes.routerRoute.path, fromDemoState: { activeDemo: demo, activeTab: 3 } },
          '#demo'
        );
      }}
    />
  );
}

//
//
// DISPLAY CODE
//
//

const DENY_CODE = `/********************************************
   Core Router Flow Control - DENY Demo
********************************************/
import { CoreRouter, routesFactory } from '@spa-tools/core-router';

const createShowcaseRoutes = routesFactory();

const flowDemoRoutes = createShowcaseRoutes({
  // see Navigation demo for showcaseRoutes
  ...showcaseRoutes,
  // here we add a new route for the flow demo
  flowDemoRoute: {
    path: '/flow-demo',
  },
});

const showcaseRouter = CoreRouter.initialize(
  flowDemoRoutes,
  {
    onRouteRequest: ({ newRoute, newState, oldRoute, oldState }) => {
      //
      // here we DENY the route request by returning a promise
      // resolving to \`false\`
      //
      // you can imagine a scenario where the user is not authorized
      // for this route and perhaps you simply want to ignore the
      // navigation request
      //
      // the Core Router requires a promise to be returned to support
      // scenarios where applications may need to first make async
      // calls out to IdP, etc before determining how to proceed with
      // a route request
      //
      return Promise.resolve(false);
    }
  }
);

showcaseRouter.navigate(
  // request to nav to the flow demo route
  flowDemoRoutes.flowDemoRoute,
);
`;

const CONFIRM_CODE = `/********************************************
   Core Router Flow Control - CONFIRM Demo
********************************************/
import { CoreRouter } from '@spa-tools/core-router';

const showcaseRouter = CoreRouter.initialize(
  // see the "Deny Route Request" demo to see how we created flowDemoRoutes
  flowDemoRoutes,
  {
    onRouteRequest: ({ newRoute, newState, oldRoute, oldState }) => {
      //
      // here we prompt the user to CONFIRM the request and then
      // return a promise resolving to the user's answer
      //
      // you can imagine a scenario where the user is navigating
      // away from a form with unsaved changes and you want to
      // confirm they want to leave the page and discard changes
      //
      // if we didn't need to prompt the user and instead wanted
      // to auto-approve the route request, we could simply return
      // a promise resolving to true or do nothing
      //
      const confirmed = confirm('Are you sure you want to navigate to the Flow Demo view?');
      return Promise.resolve(confirmed);
    }
  }
);

showcaseRouter.navigate(
  // request to nav to the flow demo route
  flowDemoRoutes.flowDemoRoute,
  // state where we let the flow demo view know how to navigate back
  {
    fromDemoPath: flowDemoRoutes.coreRouterRoute.path,
    fromDemoState: { activeTab: 3 },
  },
  // include hash to scroll to demo banner after navigation
  '#demo'
);
`;

const REDIRECT_CODE = `/********************************************
   Core Router Flow Control - REDIRECT Demo
********************************************/
import { CoreRouter } from '@spa-tools/core-router';

const showcaseRouter = CoreRouter.initialize(
  // see the "Deny Route Request" demo to see how we created flowDemoRoutes
  flowDemoRoutes,
  {
    onRouteRequest: ({ newRoute, newState, oldRoute, oldState }) => {
      //
      // here we ignore the request and instead redirect to
      // the home route by returning a promise resolving with
      // a tuple of the respective route, state, and hash
      //
      // you can also simply resolve the promise using a route
      // by itself (no tuple) using either a route object or
      // a string path
      //
      // you can also omit the hash from the tuple if you don't
      // need to scroll to an element after navigation; conversely,
      // you can provide the hash in the tuple with no state — the
      // Core Router is flexible in this regard
      //
      return Promise.resolve(
        // here's the tuple
        [
          // first element is the new route
          flowDemoRoutes.homeRoute,
          // second element is state where we let the home view
          // know how to navigate back
          {
            fromDemoPath: flowDemoRoutes.routerRoute.path,
            fromDemoState: { activeDemo: 'Redirect Flow', activeTab: 3 }
          },
          // third element is the hash that tells the router to
          // scroll to the demo banner after navigation
          '#demo',
        ]
      );
    }
  }
);

showcaseRouter.navigate(
  // request to nav to the flow demo route
  flowDemoRoutes.flowDemoRoute,
);
`;

const CODE: Record<FlowControlDemo, string> = {
  'Confirm Flow': CONFIRM_CODE,
  'Deny Flow': DENY_CODE,
  'Redirect Flow': REDIRECT_CODE,
};
