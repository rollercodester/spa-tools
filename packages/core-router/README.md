<div style='align-items: center; display:flex; flex-direction: row; gap: 1rem; margin-bottom: 1rem'>
  <img alt="@spa-tools" height="150" src="../../apps/website/static/img/logo.svg?raw=true">
  <div style='font-size: 3rem'>@spa-tools</div>
</div>

# Core Router

The `@spa-tools/core-router` package simplifies modern-day SPA routing, shedding all excess baggage without compromising functionality.

Feature highlights include:

- Dev-Defined Route Shape
- Dead-Simple Navigation
- Absolute Flow Control
- Succinct Options
- React (or not)
- TypeScript First
- Zero Dependencies
- Tree-shakable

## Quickstart

#### It's highly advised to first checkout the [@spa-tools documentation site](https://spa-tools.github.io) for a complete list of features, usage scenarios, guidance, and reference.

### Installation

`npm install @spa-tools/core-router`

### Usage

Looking for React usage? See the [docsite](https://spa-tools.github.io) for an awesome React quickstart!

#### The first thing to do is create/define your routes.

```ts
import { CoreRoute, routesFactory } from '@spa-tools/core-router';

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
});
```

#### Once you've created your routes, next you create your router.

```ts
import { CoreRouter } from '@spa-tools/core-router';
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
});
```

#### Now you can use your router from anywhere in your app to navigate to any route.

```ts
import { myRouter, myRoutes } from '..';

function navigateToFinanicals() {
  myRouter.navigate(myRoutes.financialsRoute);
}
```

## Docsite

View the [@spa-tools documentation site](https://spa-tools.github.io) for complete reference.


## Contributing

If you're interested in contributing to @spa-tools, please first create an issue on the [@spa-tools monorepo in GitHub](https://github.com/rollercodester/spa-tools)
or comment on an already open issue. From there we can discuss the feature or bugfix you're interested in and how best to approach it.
In terms of workflow, we use the standard approach of forking the repo, creating a PR, and merging after tesing/approval.

### Unit Test Coverage

All packages in @spa-tools require 100% unit test coverage. This is a condition for all PRs to be merged whether you're adding a new feature or fixing a bug.

The only exception is when native code is being wrapped and coverage is either not possible or redundant, which can be discussed on a case-by-case basis
during the approval process.

## License

All packages in @spa-tools are licensed under the [MIT](https://en.wikipedia.org/wiki/MIT_License) license. Copyright © 2024, Ryan Howard (rollercodester). All rights reserved.
