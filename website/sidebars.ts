import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

export default {
  docs: [
    {
      id: 'overview/welcome',
      label: 'Overview',
      type: 'doc',
    },
    {
      collapsible: true,
      items: [
        {
          id: 'api-client/getting-started',
          label: 'Getting Started',
          type: 'doc',
        },
        {
          items: [
            {
              id: 'api-client/guide-throttling',
              type: 'doc',
            },
            {
              id: 'api-client/guide-caching',
              type: 'doc',
            },
            {
              id: 'api-client/guide-state-interpolation',
              type: 'doc',
            },
            {
              id: 'api-client/guide-result-mapping',
              type: 'doc',
            },
            {
              id: 'api-client/guide-pagination',
              type: 'doc',
            },
            {
              id: 'api-client/guide-react-append-data',
              type: 'doc',
            },
          ],
          label: 'Guides',
          type: 'category',
        },
        {
          items: [
            {
              id: 'api-client/reference-vanilla',
              type: 'doc',
            },
            {
              id: 'api-client/reference-react',
              type: 'doc',
            },
          ],
          label: 'Reference',
          type: 'category',
        },
      ],
      label: 'API Client',
      type: 'category',
    },
    {
      collapsible: true,
      items: [
        {
          id: 'core-router/getting-started',
          label: 'Getting Started',
          type: 'doc',
        },
        {
          items: [
            {
              id: 'core-router/guide-auth-check',
              type: 'doc',
            },
            {
              id: 'core-router/guide-confirmation',
              type: 'doc',
            },
            {
              id: 'core-router/guide-state-interpolation',
              type: 'doc',
            },
            {
              id: 'core-router/guide-fallback-route',
              type: 'doc',
            },
            {
              id: 'core-router/guide-hash-autoscroll',
              type: 'doc',
            },
          ],
          label: 'Guides',
          type: 'category',
        },
        {
          items: [
            {
              id: 'core-router/reference-vanilla',
              type: 'doc',
            },
            {
              id: 'core-router/reference-react',
              type: 'doc',
            },
          ],
          label: 'Reference',
          type: 'category',
        },
      ],
      label: 'Core Router',
      type: 'category',
    },
    {
      collapsible: true,
      items: [
        {
          id: 'runtime-config/getting-started',
          label: 'Getting Started',
          type: 'doc',
        },
        {
          items: [
            {
              id: 'runtime-config/guide-obfuscation',
              type: 'doc',
            },
            {
              id: 'runtime-config/guide-ssr',
              type: 'doc',
            },
          ],
          label: 'Guides',
          type: 'category',
        },
        {
          id: 'runtime-config/reference',
          label: 'Reference',
          type: 'doc',
        },
      ],
      label: 'Runtime Config',
      type: 'category',
    },
    {
      collapsible: true,
      items: [
        {
          id: 'interaction-hooks/getting-started',
          label: 'Getting Started',
          type: 'doc',
        },
        {
          id: 'interaction-hooks/use-call-once',
          label: 'useCallOnce',
          type: 'doc',
        },
        {
          id: 'interaction-hooks/use-detect-keydown',
          label: 'useDetectKeyDown',
          type: 'doc',
        },
        {
          id: 'interaction-hooks/use-infinite-scroll',
          label: 'useInfiniteScroll',
          type: 'doc',
        },
        {
          id: 'interaction-hooks/use-is-hovered',
          label: 'useIsHovered',
          type: 'doc',
        },
        {
          id: 'interaction-hooks/use-is-overflowed',
          label: 'useIsOverflowed',
          type: 'doc',
        },
        {
          id: 'interaction-hooks/use-query-state',
          label: 'useQueryState',
          type: 'doc',
        },
      ],
      label: 'Interaction Hooks',
      type: 'category',
    },
    {
      collapsible: true,
      items: [
        {
          id: 'utilities/getting-started',
          label: 'Getting Started',
          type: 'doc',
        },
        {
          collapsible: true,
          items: [
            {
              id: 'utilities/colors/color-object',
              type: 'doc',
            },
            {
              id: 'utilities/colors/hex-to-rgba',
              type: 'doc',
            },
            {
              id: 'utilities/colors/parse-color',
              type: 'doc',
            },
            {
              id: 'utilities/colors/rgba-to-hex',
              type: 'doc',
            },
            {
              id: 'utilities/colors/shade',
              type: 'doc',
            },
            {
              id: 'utilities/colors/tint',
              type: 'doc',
            },
            {
              id: 'utilities/colors/tone',
              type: 'doc',
            },
          ],
          label: 'Colors',
          type: 'category',
        },
        {
          collapsible: true,
          items: [
            {
              id: 'utilities/conditionals/are-dates-equal',
              type: 'doc',
            },
            {
              id: 'utilities/conditionals/inline-switch',
              type: 'doc',
            },
            {
              id: 'utilities/conditionals/is-future',
              type: 'doc',
            },
            {
              id: 'utilities/conditionals/is-leap-year',
              type: 'doc',
            },
            {
              id: 'utilities/conditionals/is-not-empty-record',
              type: 'doc',
            },
            {
              id: 'utilities/conditionals/is-past',
              type: 'doc',
            },
            {
              id: 'utilities/conditionals/is-promise',
              type: 'doc',
            },
            {
              id: 'utilities/conditionals/is-record',
              type: 'doc',
            },
            {
              id: 'utilities/conditionals/is-today',
              type: 'doc',
            },
            {
              id: 'utilities/conditionals/is-tomorrow',
              type: 'doc',
            },
            {
              id: 'utilities/conditionals/is-yesterday',
              type: 'doc',
            },
            {
              id: 'utilities/conditionals/looks-like-base64',
              type: 'doc',
            },
            {
              id: 'utilities/conditionals/tern',
              type: 'doc',
            },
          ],
          label: 'Conditionals',
          type: 'category',
        },
        {
          collapsible: true,
          items: [
            {
              id: 'utilities/data/base64-to-bytes',
              type: 'doc',
            },
            {
              id: 'utilities/data/bytes-to-base64',
              type: 'doc',
            },
            {
              id: 'utilities/data/deep-clone',
              type: 'doc',
            },
            {
              id: 'utilities/data/deep-equal',
              type: 'doc',
            },
            {
              id: 'utilities/data/deep-merge',
              type: 'doc',
            },
            {
              id: 'utilities/data/download-csv-file',
              type: 'doc',
            },
            {
              id: 'utilities/data/download-file',
              type: 'doc',
            },
            {
              id: 'utilities/data/get-nested-value',
              type: 'doc',
            },
            {
              id: 'utilities/data/hash',
              type: 'doc',
            },
            {
              id: 'utilities/data/is-not-empty-record',
              type: 'doc',
            },
            {
              id: 'utilities/data/is-promise',
              type: 'doc',
            },
            {
              id: 'utilities/data/is-record',
              type: 'doc',
            },
            {
              id: 'utilities/data/json-stringify',
              type: 'doc',
            },
            {
              id: 'utilities/data/looks-like-base64',
              type: 'doc',
            },
            {
              id: 'utilities/data/omit',
              type: 'doc',
            },
            {
              id: 'utilities/data/pick',
              type: 'doc',
            },
          ],
          label: 'Data',
          type: 'category',
        },
        {
          collapsible: true,
          items: [
            {
              id: 'utilities/dates/add-days',
              type: 'doc',
            },
            {
              id: 'utilities/dates/add-hours',
              type: 'doc',
            },
            {
              id: 'utilities/dates/add-milliseconds',
              type: 'doc',
            },
            {
              id: 'utilities/dates/add-minutes',
              type: 'doc',
            },
            {
              id: 'utilities/dates/add-months',
              type: 'doc',
            },
            {
              id: 'utilities/dates/add-seconds',
              type: 'doc',
            },
            {
              id: 'utilities/dates/add-weeks',
              type: 'doc',
            },
            {
              id: 'utilities/dates/add-years',
              type: 'doc',
            },
            {
              id: 'utilities/dates/are-dates-equal',
              type: 'doc',
            },
            {
              id: 'utilities/dates/days-diff',
              type: 'doc',
            },
            {
              id: 'utilities/dates/is-future',
              type: 'doc',
            },
            {
              id: 'utilities/dates/is-leap-year',
              type: 'doc',
            },
            {
              id: 'utilities/dates/is-past',
              type: 'doc',
            },
            {
              id: 'utilities/dates/is-today',
              type: 'doc',
            },
            {
              id: 'utilities/dates/is-tomorrow',
              type: 'doc',
            },
            {
              id: 'utilities/dates/is-yesterday',
              type: 'doc',
            },
            {
              id: 'utilities/dates/normalize-date',
              type: 'doc',
            },
          ],
          label: 'Dates',
          type: 'category',
        },
        {
          collapsible: true,
          items: [
            {
              id: 'utilities/dom/scroll-to-bottom',
              type: 'doc',
            },
          ],
          label: 'DOM',
          type: 'category',
        },
        {
          collapsible: true,
          items: [
            {
              id: 'utilities/errors/normalize-error',
              type: 'doc',
            },
          ],
          label: 'Errors',
          type: 'category',
        },
        {
          collapsible: true,
          items: [
            {
              id: 'utilities/execution-control/debounce',
              type: 'doc',
            },
            {
              id: 'utilities/execution-control/exec-once',
              type: 'doc',
            },
            {
              id: 'utilities/execution-control/sleep',
              type: 'doc',
            },
          ],
          label: 'Execution Control',
          type: 'category',
        },
        {
          collapsible: true,
          items: [
            {
              id: 'utilities/numbers/ensure-num',
              type: 'doc',
            },
            {
              id: 'utilities/numbers/format-dollars',
              type: 'doc',
            },
            {
              id: 'utilities/numbers/format-float',
              type: 'doc',
            },
            {
              id: 'utilities/numbers/format-money',
              type: 'doc',
            },
            {
              id: 'utilities/numbers/format-quotient',
              type: 'doc',
            },
            {
              id: 'utilities/numbers/get-random-number',
              type: 'doc',
            },
            {
              id: 'utilities/numbers/humanize-hrs',
              type: 'doc',
            },
            {
              id: 'utilities/numbers/humanize-ms',
              type: 'doc',
            },
            {
              id: 'utilities/numbers/humanize-unit',
              type: 'doc',
            },
            {
              id: 'utilities/numbers/round-to-nearest',
              type: 'doc',
            },
            {
              id: 'utilities/numbers/shift-decimal-places',
              type: 'doc',
            },
          ],
          label: 'Numbers',
          type: 'category',
        },
        {
          collapsible: true,
          items: [
            {
              id: 'utilities/strings/add-forward-slash',
              type: 'doc',
            },
            {
              id: 'utilities/strings/base64-to-bytes',
              type: 'doc',
            },
            {
              id: 'utilities/strings/bytes-to-base64',
              type: 'doc',
            },
            {
              id: 'utilities/strings/capitalize-first-word',
              type: 'doc',
            },
            {
              id: 'utilities/strings/ensure-str',
              type: 'doc',
            },
            {
              id: 'utilities/strings/format-proper-case',
              type: 'doc',
            },
            {
              id: 'utilities/strings/make-readable',
              type: 'doc',
            },
            {
              id: 'utilities/strings/separate-words',
              type: 'doc',
            },
          ],
          label: 'Strings',
          type: 'category',
        },
        {
          collapsible: true,
          items: [
            {
              id: 'utilities/type-helpers/as-strategy',
              type: 'doc',
            },
            {
              id: 'utilities/type-helpers/inline-switch',
              type: 'doc',
            },
          ],
          label: 'Type Helpers',
          type: 'category',
        },
        {
          collapsible: true,
          items: [
            {
              id: 'utilities/urls/add-forward-slash',
              type: 'doc',
            },
            {
              id: 'utilities/urls/interpolate-url',
              type: 'doc',
            },
          ],
          label: 'URLs',
          type: 'category',
        },
      ],
      label: 'Utilities',
      type: 'category',
    },
  ],
} satisfies SidebarsConfig;
