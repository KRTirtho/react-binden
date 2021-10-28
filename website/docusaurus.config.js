// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'React Binden',
    tagline:
        "Simple yet customizable React form handling & validation library inspired from Vue's bind-model",
    url: 'https://react-binden.netlify.app',
    baseUrl: '/',
    onBrokenLinks: 'warn',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',
    organizationName: 'react-binden', // Usually your GitHub org/user name.
    projectName: 'react-binden', // Usually your repo name.

    presets: [
        [
            '@docusaurus/preset-classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                    // Please change this to your repo.
                    editUrl: 'https://github.com/KRTirtho/react-binden/tree/master/website',
                    remarkPlugins: [
                        [require('docusaurus-remark-plugin-codetabs'), {}],
                        [require('@docusaurus/remark-plugin-npm2yarn'), { sync: true }],
                    ],
                },
                blog: {
                    showReadingTime: true,
                    // Please change this to your repo.
                    editUrl:
                        'https://github.com/KRTirtho/react-binden/tree/master/website',
                    remarkPlugins: [
                        [require('docusaurus-remark-plugin-codetabs'), {}],
                        [require('@docusaurus/remark-plugin-npm2yarn'), { sync: true }],
                    ],
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            }),
        ],
    ],
    themes: ['@docusaurus/theme-live-codeblock'],
    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            navbar: {
                title: 'React Binden',
                logo: {
                    alt: 'React Binden Logo',
                    src: 'img/logos/react-binden-logo-transparent.svg',
                    srcDark: 'img/logos/react-binden-logo-transparent-light.svg'
                },
                items: [
                    {
                        type: 'doc',
                        docId: 'intro',
                        position: 'left',
                        label: 'Docs',
                    },
                    { to: '/blog', label: 'Blog', position: 'left' },
                    {
                        href: 'https://github.com/KRTirtho/react-binden',
                        label: 'GitHub',
                        position: 'right',
                    },
                ],
            },
            footer: {
                style: 'light',
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
                    {
                        title: 'Community',
                        items: [
                            {
                                label: 'Stack Overflow',
                                href: 'https://stackoverflow.com/questions/tagged/react-binden',
                            },
                            {
                                label: 'Twitter',
                                href: 'https://twitter.com/krtirtho',
                            },
                        ],
                    },
                    {
                        title: 'More',
                        items: [
                            {
                                label: 'Blog',
                                to: '/blog',
                            },
                            {
                                label: 'GitHub',
                                href: 'https://github.com/KRTirtho/react-binden',
                            },
                        ],
                    },
                ],
                copyright: `Copyright © ${new Date().getFullYear()} React Binden, Inc`,
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
            },
        }),
};

module.exports = config;
