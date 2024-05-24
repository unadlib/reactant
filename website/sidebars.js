/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  // tutorialSidebar: [{ type: 'autogenerated', dirName: 'doc' }],

  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Tutorial',
      items: ['hello'],
    },
  ],
   */
  docs: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: true,
      link: {
        type: 'generated-index',
        description: '5 minutes to learn the most important Reactant concepts.',
      },
      items: [
        {
          type: 'autogenerated',
          dirName: 'getting-started',
        },
      ],
    },
    {
      type: 'category',
      label: 'Basic Tutorial',
      link: {
        type: 'generated-index',
      },
      items: [
        {
          type: 'autogenerated',
          dirName: 'basic-tutorial',
        },
      ],
    },
    {
      type: 'category',
      label: 'Advanced Guides',
      link: {
        type: 'generated-index',
      },
      items: [
        {
          type: 'autogenerated',
          dirName: 'advanced-guides',
        },
      ],
    },
    {
      type: 'category',
      label: 'Shared App',
      link: {
        type: 'generated-index',
      },
      items: [
        {
          type: 'autogenerated',
          dirName: 'shared-app',
        },
      ],
    },
    {
      type: 'category',
      label: 'Tooling',
      link: {
        type: 'generated-index',
      },
      items: [
        {
          type: 'autogenerated',
          dirName: 'tooling',
        },
      ],
    },
    {
      type: 'category',
      label: 'Resources',
      link: {
        type: 'generated-index',
      },
      items: [
        {
          type: 'autogenerated',
          dirName: 'resources',
        },
      ],
    },
  ],
  api: [
    {
      type: 'category',
      label: 'Base',
      items: [
        'api/reactant/modules/createApp',
        'api/reactant/modules/hooks_useConnector',
        'api/reactant/modules/testBed',
        'api/reactant-module/modules/decorators_state',
        'api/reactant-module/modules/decorators_action',
        'api/reactant-module/modules/decorators_computed',
        'api/reactant-module/modules/decorators_autobind',
        'api/reactant-module/modules/decorators_lazy',
        'api/reactant-module/modules/core_createState',
        'api/reactant-module/modules/core_dispatch',
        'api/reactant-module/modules/core_subscribe',
        'api/reactant-module/modules/core_watch',
        'api/reactant-module/modules/core_load',
        'api/reactant-module/modules/core_applyMiddleware',
        'api/reactant-module/classes/core_view.ViewModule',
        'api/reactant-module/classes/core_plugin.PluginModule',
      ],
    },
    {
      type: 'category',
      label: 'Dependency Injection',
      items: [
        'api/reactant-module/modules/decorators_injectable',
        'api/reactant-di/modules/decorators_inject',
        'api/reactant-di/modules/decorators_optional',
        'api/reactant-di/modules/decorators_multiInject',
        'api/reactant-di/modules/decorators_multiOptional',
        'api/reactant-di/classes/moduleRef.ModuleRef',
        'api/reactant-di/modules/forwardRef',
        'api/reactant-di/classes/optional.Optional',
      ],
    },
    {
      type: 'category',
      label: 'Shared App',
      items: [
        'api/reactant-share/modules/createApp',
        'api/reactant-share/classes/portDetector.PortDetector',
        'api/reactant-share/modules/delegate',
        'api/reactant-share/modules/fork',
        'api/reactant-share/classes/router.Router',
        'api/reactant-share/interfaces/router.IRouterOptions',
        'api/reactant-share/classes/storage.Storage',
        'api/reactant-share/interfaces/storage.IStorageOptions',
      ],
    },
    {
      type: 'category',
      label: 'Router',
      items: [
        'api/reactant-router/classes/Router',
        'api/reactant-router/interfaces/IRouterOptions',
      ],
    },
    {
      type: 'category',
      label: 'Storage',
      items: [
        'api/reactant-storage/classes/Storage',
        'api/reactant-storage/interfaces/IStorageOptions',
      ],
    },
  ],
};

module.exports = sidebars;
