// TODO: Remove custom Babel config and replace Babel with SWC - https://nextjs.org/docs/messages/swc-disabled

const moduleResolvers = {
  root: ['./'],
  alias: {
    '@lib': './src/lib',
    '@hooks': './src/hooks',
    '@contexts': './src/contexts',
    '@components': './src/components',
    '@containers': './src/containers',
    '@hoc': './src/hoc',
    '@theming': './src/theming',
    '@lang': './src/lang',
    '@graphql-server': './src/graphql/server',
    '@graphql-sdk': './src/graphql/sdk',
    '@icons': ['./src/theming/icons', '@mui/icons-material'],
  },
}

// can be removed when env var BRAND_THEME will be no longer in use
if (process.env.BRAND_THEME !== 'true') {
  const entries = Object.entries(moduleResolvers.alias)
  const entriesWithoutOverwrites = entries.map(([key, value]) =>
    Array.isArray(value) ? [key, value[1]] : [key, value],
  )
  moduleResolvers.alias = Object.fromEntries(entriesWithoutOverwrites)
}

module.exports = api => {
  api.cache(true)

  return {
    presets: ['next/babel'],
    plugins: [
      '@babel/plugin-proposal-optional-chaining',
      ['module-resolver', moduleResolvers],
      // TODO: Remove or set loose to false after investigating the change impact
      // ['@babel/plugin-proposal-class-properties', { loose: true }],
      'graphql-tag',
      'inline-react-svg',
    ],
    env: {
      production: {
        plugins: ['lodash'],
      },
      test: {
        plugins: ['dynamic-import-node'],
      },
    },
  }
}
