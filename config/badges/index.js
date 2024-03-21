import { renderBadges } from "badges";

var args = process.argv.slice(2);

if (args.length === 0) {
  console.error("Error: No package name provided");
  process.exit(1);
}

// Listing of badges to output
const list = [
  // Development Badges
  "npmversion",
  // ---> enable later once we get traction: "npmdownloads",
  // Testing Badges
  [
    "badge",
    {
      alt: "Test and Build",
      image:
        "https://github.com/rollercodester/spa-tools/actions/workflows/test-and-build-packages.yml/badge.svg",
      title: "Test and Build",
      url: "https://github.com/rollercodester/spa-tools/actions/workflows/test-and-build-packages.yml",
    },
  ],
  ["badge", { alt: "Code Coverage", image: "./coverage-badge.svg" }],
];

// Configuration for the badges
const config = {
  homepage: "https://rollercodester.github.io/spa-tools/",
  nodeicoQueryString: { compact: true, downloads: false, height: 2 },
  npmPackageName: `@spa-tools/${args[0]}`,
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
