import { renderBadges } from "badges";

// Listing of badges to output
const list = [
  // Development Badges
  "npmversion",
  // ---> enable later once we get traction: "npmdownloads",
  // Testing Badges
  "githubworkflow",
  ["badge", { alt: "Code Coverage", image: "./coverage-badge.svg" }],
];

// Configuration for the badges
const config = {
  githubSlug: "rollercodester/spa-tools",
  githubUsername: "rollercodester",
  githubWorkflow: "build-monorepo.yml",
  homepage: "https://rollercodester.github.io/spa-tools/",
  nodeicoQueryString: { compact: true, downloads: false, height: 2 },
  npmPackageName: "@spa-tools/core-router",
};

// Options for rendering the badges
const options = {
  // Filter Category
  // When set to a string, will only render badges from the list that of the specified category
  // Values can be 'development', 'testing', 'funding', or 'social'
  // E.g. to render only funding badges, set to 'funding'
  filterCategory: false,

  // Filter Scripts
  // When true, do not render any badges from the list that are scripts
  filterScripts: false,
};

// Render the badges to a string
const result = renderBadges(list, config, options);

// Output the result
console.log(result);
