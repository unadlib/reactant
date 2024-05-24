/* eslint-disable global-require */
// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Reactant',
  tagline: 'A framework for building React applications',
  url: 'https://reactant.js.org/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.

  projectName: 'reactant',
  organizationName: 'unadlib',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  trailingSlash: false,

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/unadlib/reactant/tree/master/website/',
          remarkPlugins: [
            [require('@docusaurus/remark-plugin-npm2yarn'), { sync: true }],
          ],
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/unadlib/reactant/tree/master/website/',
          remarkPlugins: [
            [require('@docusaurus/remark-plugin-npm2yarn'), { sync: true }],
          ],
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  plugins: [
    [
      'docusaurus-plugin-typedoc',
      {
        readme: 'none',
        sidebar: {
          categoryLabel: 'Base',
          position: 1,
        },
        entryPoints: [
          '../packages/reactant/src/createApp.tsx',
          '../packages/reactant/src/testBed.ts',
          '../packages/reactant/src/hooks/useConnector.ts',
        ],
        tsconfig: '../tsconfig.json',
        out: 'api/reactant',
        id: 'api/reactant',
      },
    ],
    [
      'docusaurus-plugin-typedoc',
      {
        readme: 'none',
        sidebar: {
          categoryLabel: 'Dependency Injection',
          position: 2,
        },
        entryPoints: [
          '../packages/reactant-di/src/decorators/injectable.ts',
          '../packages/reactant-di/src/decorators/optional.ts',
          '../packages/reactant-di/src/decorators/inject.ts',
          '../packages/reactant-di/src/decorators/lazy.ts',
          '../packages/reactant-di/src/decorators/multiInject.ts',
          '../packages/reactant-di/src/decorators/multiOptional.ts',
          '../packages/reactant-di/src/moduleRef.ts',
          '../packages/reactant-di/src/forwardRef.ts',
          '../packages/reactant-di/src/optional.ts',
        ],
        tsconfig: '../tsconfig.json',
        out: 'api/reactant-di',
        id: 'api/reactant-di',
      },
    ],
    [
      'docusaurus-plugin-typedoc',
      {
        readme: 'none',
        sidebar: {
          categoryLabel: 'Module Model',
          position: 3,
        },
        entryPoints: [
          '../packages/reactant-module/src/decorators/state.ts',
          '../packages/reactant-module/src/decorators/action.ts',
          '../packages/reactant-module/src/decorators/computed.ts',
          '../packages/reactant-module/src/decorators/autobind.ts',
          '../packages/reactant-module/src/core/subscribe.ts',
          '../packages/reactant-module/src/core/watch.ts',
          '../packages/reactant-module/src/core/view.ts',
          '../packages/reactant-module/src/core/plugin.ts',
          '../packages/reactant-module/src/core/load.ts',
          '../packages/reactant-module/src/core/applyMiddleware.ts',
          '../packages/reactant-module/src/core/createState.ts',
          '../packages/reactant-module/src/core/dispatch.ts',
          '../packages/reactant-module/src/decorators/injectable.ts',
          '../packages/reactant-module/src/decorators/lazy.ts',
        ],
        tsconfig: '../tsconfig.json',
        out: 'api/reactant-module',
        id: 'api/reactant-module',
      },
    ],
    [
      'docusaurus-plugin-typedoc',
      {
        readme: 'none',
        sidebar: {
          categoryLabel: 'Shared App',
          position: 4,
        },
        entryPoints: [
          '../packages/reactant-share/src/createApp.ts',
          '../packages/reactant-share/src/portDetector.ts',
          '../packages/reactant-share/src/delegate.ts',
          '../packages/reactant-share/src/fork.ts',
          '../packages/reactant-share/src/router.ts',
          '../packages/reactant-share/src/storage.ts',
        ],
        tsconfig: '../tsconfig.json',
        out: 'api/reactant-share',
        id: 'api/reactant-share',
      },
    ],
    [
      'docusaurus-plugin-typedoc',
      {
        readme: 'none',
        sidebar: {
          categoryLabel: 'Router',
          position: 5,
        },
        entryPoints: ['../packages/reactant-router/src/router.tsx'],
        tsconfig: '../tsconfig.json',
        out: 'api/reactant-router',
        id: 'api/reactant-router',
      },
    ],
    [
      'docusaurus-plugin-typedoc',
      {
        readme: 'none',
        sidebar: {
          categoryLabel: 'Storage',
          position: 6,
        },
        entryPoints: ['../packages/reactant-storage/src/storage.tsx'],
        tsconfig: '../tsconfig.json',
        out: 'api/reactant-storage',
        id: 'api/reactant-storage',
      },
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Reactant',
        logo: {
          alt: 'Reactant Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Docs',
          },
          {
            label: 'API',
            position: 'left',
            sidebarId: 'api',
            type: 'docSidebar',
          },
          { to: '/blog', label: 'Blog', position: 'left' },
          {
            href: 'https://github.com/unadlib/reactant',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Docs',
                to: '/docs/intro',
              },
            ],
          },
          // {
          //   title: 'Community',
          //   items: [
          //     {
          //       label: 'Stack Overflow',
          //       href: 'https://stackoverflow.com/questions/tagged/docusaurus',
          //     },
          //     {
          //       label: 'Discord',
          //       href: 'https://discordapp.com/invite/docusaurus',
          //     },
          //     {
          //       label: 'Twitter',
          //       href: 'https://twitter.com/docusaurus',
          //     },
          //   ],
          // },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/unadlib/reactant',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} unadlib. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
    }),
};

module.exports = config;
