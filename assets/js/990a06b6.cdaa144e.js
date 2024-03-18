"use strict";(self.webpackChunk_spa_tools_website=self.webpackChunk_spa_tools_website||[]).push([[8558],{4823:(e,t,o)=>{o.r(t),o.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>h,frontMatter:()=>s,metadata:()=>u,toc:()=>l});var r=o(7458),n=o(7996),a=o(5207);const s={title:"State Interpolation",pagination_label:"Core Router Guide: State Interpolation",pagination_next:"core-router/guide-fallback-route",pagination_prev:"core-router/guide-confirmation",sidebar_label:"State Interpolation",slug:"/core-router/guides/state-interpolation"},i="State Interpolation",u={id:"core-router/guide-state-interpolation",title:"State Interpolation",description:"The @spa-tools/core-router package makes passing and consuming state in routing flows so easy that you could say it's auto-magic.",source:"@site/docs/core-router/guide-state-interpolation.mdx",sourceDirName:"core-router",slug:"/core-router/guides/state-interpolation",permalink:"/spa-tools/core-router/guides/state-interpolation",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{title:"State Interpolation",pagination_label:"Core Router Guide: State Interpolation",pagination_next:"core-router/guide-fallback-route",pagination_prev:"core-router/guide-confirmation",sidebar_label:"State Interpolation",slug:"/core-router/guides/state-interpolation"},sidebar:"docs",previous:{title:"Core Router Guide: Pre-Nav Confirmation",permalink:"/spa-tools/core-router/guides/confirmation"},next:{title:"Core Router Guide: Fallback Route",permalink:"/spa-tools/core-router/guides/fallback-route"}},c={},l=[];function p(e){const t={code:"code",h1:"h1",p:"p",pre:"pre",...(0,n.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a.D_,{packageName:"@spa-tools/core-router"}),"\n",(0,r.jsx)(t.h1,{id:"state-interpolation",children:"State Interpolation"}),"\n",(0,r.jsxs)(t.p,{children:["The ",(0,r.jsx)(t.code,{children:"@spa-tools/core-router"})," package makes passing and consuming state in routing flows so easy that you could say it's auto-magic."]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-js",children:"import { CoreRouter, routesFactory } from '@spa-tools/core-router';\n\nconst createMyRoutes = routesFactory();\n\n// here we create two routes, one for navigating to all products using\n// query template params for sorting while the other route is for navigating\n// to products for a category via a path param with no query params, yet\n// we will demo how the same sort state can be auto-interpolated into the\n// path without explicit query templating\nconst myRoutes = createMyRoutes({\n  productsRoute: {\n    // here we explicitly define sort query params in the path\n    path: '/products?sortBy=:sortBy&sortDir=:sortDir',\n    // here we configure this route so the router removes any query params\n    // that do not get interpolated from the route state (i.e. orphaned\n    // query params); this is useful for keeping the URL clean and free of\n    // unnecessary query params that still contain placeholder tokens\n    removeUnusedQueryParams: true,\n  },\n  productsByCategoryRoute: {\n    // here we define a path param for the category but we\n    // do NOT specify the sort query params in the path\n    path: '/products/category/:category',\n    // here we configure this route so the router adds any unused state\n    // to the query string; this will enable us to include the same sort\n    // state in the URL without explicitly defining it in the path\n    addUnusedStateToQueryString: true,\n  },\n});\n\n// here we create a new instance of the CoreRouter class and pass in\n// our routes object; we also pass in an object that implements the\n// router lifecycle callback onRouteChange so we can log outcomes\nconst myRouter = CoreRouter.initialize(myRoutes, {\n  onRouteChange: () => {\n    // this is where we would perform any post-processing logic, which\n    // typically means rendering the requested route. How to do this\n    // ranges based on the UI framework being used, so here we simply\n    // log path info to the console.\n    //\n    // If you're using React or want to create an abstraction for a\n    // different rendering package/framework, you should definitely\n    // check out the Core React Router abstraction, which has the\n    // rendering logic sweetly baked in.\n    console.log(\n      `Route change with interpolated path: ${window.location.pathname + window.location.search + window.location.hash}`\n    );\n  },\n});\n\n// here we navigate to the products route with sort state\n// so you should see the sort info interpolated in the path\n// (check console and browser URL)\nmyRouter.navigate(myRoutes.productsRoute, {\n  sortBy: 'price',\n  sortDir: 'asc',\n});\n\n// here we navigate to the same products route but this time without\n// any sort state, so the sort query params should now be auto-removed\n// from the interpolated path (check console and browser URL)\nmyRouter.navigate(myRoutes.productsRoute);\n\n// here we navigate to the products-by-category route with sort state\n// so you should see both the category and sort info auto-interpolated\n// in the path (check console and browser URL)\nmyRouter.navigate(myRoutes.productsByCategoryRoute, {\n  category: 'electronics',\n  sortBy: 'price',\n  sortDir: 'desc',\n});\n"})})]})}function h(e={}){const{wrapper:t}={...(0,n.a)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(p,{...e})}):p(e)}}}]);