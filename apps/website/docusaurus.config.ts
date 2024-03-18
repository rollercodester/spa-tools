/* eslint-disable sort-keys-plus/sort-keys */
import { themes as prismThemes } from 'prism-react-renderer';
import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';

export default {
  favicon: 'img/logo-dark.svg',
  // tagline: 'Open-source for SPAwesome apps',
  //tagline: 'Open-source tools for awesome SPAs',
  tagline: 'A collection of open-source packages to help you better-build single-page applications.',
  title: '@spa-tools',

  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/spa-tools',

  // Set the production url of your site here
  url: 'https://rollercodester.github.io',

  trailingSlash: false,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        blog: false,
        docs: {
          remarkPlugins: [[require('@docusaurus/remark-plugin-npm2yarn'), { sync: true }]],
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    image: 'img/social-card.jpeg',
    navbar: {
      items: [
        {
          label: 'Docs',
          position: 'left',
          to: 'overview',
        },
        {
          label: 'API Client',
          position: 'left',
          to: 'api-client',
        },
        {
          label: 'Core Router',
          position: 'left',
          to: 'core-router',
        },
        {
          label: 'Runtime Config',
          position: 'left',
          to: 'runtime-config',
        },
        {
          label: 'Interaction Hooks',
          position: 'left',
          to: 'interaction-hooks',
        },
        {
          label: 'Utilities',
          position: 'left',
          to: 'utilities',
        },
        {
          href: 'https://rollercodester.github.io/spa-tools-demo',
          label: 'Live Demo',
          position: 'right',
        },
        {
          href: 'https://github.com/rollercodester/spa-tools',
          label: 'GitHub',
          position: 'right',
        },
      ],
      logo: {
        alt: '@spa-tools logo',
        src: 'img/logo.svg',
        srcDark: 'img/logo-dark.svg',
      },
      title: '@spa-tools',
    },
    prism: {
      additionalLanguages: ['typescript'],
      darkTheme: prismThemes.vsDark,
      defaultLanguage: 'typescript',
      theme: prismThemes.vsDark,
    },
  } satisfies Preset.ThemeConfig,
} satisfies Config;
