const checker = require('vite-plugin-ts-checker').default;

module.exports = {
    stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
    core: {
        builder: 'storybook-builder-vite',
    },
    async viteFinal(config) {
        config.plugins.push(checker());
        return config;
    },
};
