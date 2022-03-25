import { merge } from 'lodash'
import defaultTheme from './defaultTheme'

const secondary = {
  main: '#ff4240',
  dark: '#df2e2d',
}

const palette = {
  primary: {
    main: '#289252',
    dark: '#037d32',
  },
  secondary,
  cart: secondary,
}

const components = {
  MuiBadge: {
    defaultProps: { color: 'secondary' },
  },
  MuiButton: {
    styleOverrides: {
      containedSecondary: null,
      cart: {
        backgroundColor: `${palette.secondary.main} !important`,
      },
      cartDecrement: {
        color: 'inherit !important',
        border: 'solid 0.5px #bababa',
        backgroundColor: '#fff !important',
      },
    },
  },
  MuiListItemText: {
    styleOverrides: {
      primary: {
        '.Mui-selected &': {
          color: palette.primary.main,
          fontWeight: 'bold'
        },
      },
    },
  },
}

export default merge({}, defaultTheme, {
  palette,
  components
})
