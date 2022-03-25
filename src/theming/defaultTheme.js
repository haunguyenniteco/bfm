// from defaultTheme - deprecated
const colorsGray = {
  G0: '#000000',
  G1: '#130c0e',
  G2: '#838383',
  G3: '#bbbbbb',
  G4: '#f6f6f6',
  G5: '#ffffff',
  G6: '#2f3a44',
  G7: '#333333',
  grayLight: '#E7E7E7'
}

const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 800,
    lg: 1000,
    xl: 1296,
  },
}

export const colors = {
  whiteGreen: '#80bd26',
  darkGreen: '#4e6e32',
  whiteGrey: '#f6f6f6',
  darkGrey: '#bbbbbb',
  warmGrey: '#838383',
  normalGrey: '#130c0e',
  red: '#cf1b1b',
  white: '#fff',
  black: '#000',
}
const palette = {
  ...colorsGray,
  primary: {
    main: colors.whiteGreen,
    dark: colors.darkGreen,
  },
  secondary: {
    main: colors.whiteGrey,
    dark: colors.darkGrey
  },
  cart: {
    main: colors.whiteGreen,
    dark: colors.darkGreen,
  },
  background: {
    default: colors.white,
  },
  ...colors,
}

const font = {
  fontOpenSanRegular: 'OpenSans Regular',
  fontOpenSanBold: 'OpenSans Bold',
  fontOpenSanExtraBold: 'OpenSans ExtraBold',
  fontImpact: 'Impact'
}

const theme = {
  font,
  breakpoints,
  typography: {
    fontFamily: font.fontOpenSanRegular,
    h1: { fontFamily: font.fontImpact, fontSize: '24px', fontWeight: 500, lineHeight: 1.33, letterSpacing: '-0.1px', color: colors.whiteGreen, textTransform: 'uppercase' },
    h2: { fontFamily: font.fontOpenSanExtraBold, fontSize: '18px', fontWeight: 800, lineHeight: 1.71, letterSpacing: '-0.1px'},
    h3: { fontFamily: font.fontOpenSanBold, fontSize: '18px', fontWeight: 700, lineHeight: 1.4, letterSpacing: '-0.1px' },
    h4: { fontFamily: font.fontOpenSanBold, fontSize: '16px', fontWeight: 700, lineHeight: 1.23, letterSpacing: '-0.1px' },
    h5: { fontFamily: font.fontOpenSanRegular, fontSize: '14px', fontWeight: 400, lineHeight: 1.2, letterSpacing: '-0.1px' },
    h6: { fontFamily: font.fontOpenSanRegular, fontSize: '12px', fontWeight: 400, lineHeight: 1.17, letterSpacing: '-0.1px' },
    body1: { fontFamily: font.fontOpenSanRegular, fontSize: '14px', lineHeight: 1.61, color: colors.normalGrey },
    body2: { fontSize: '12px' },
    button: { fontSize: '12px', textTransform: 'none', fontWeight: 'normal' },
  },
  shape: { borderRadius: 2 },
  fontWeights: { body: 300, heading: 700, bold: 700 },
  components: {
    MuiBadge: {
      defaultProps: { color: 'primary' },
    },
    MuiButton: {
      defaultProps: { variant: 'contained', disableElevation: true },
      styleOverrides: {
        containedPrimary: { 
          fontFamily: font.fontOpenSanBold,
          lineHeight: 1.4,
          textTransform: 'capitalize',
          border: 'transparent', 
          color: colors.white,
          borderRadius: '2px'
         },
        containedSecondary: {
          backgroundColor: colors.white,
          border: '1px solid #f6f6f6',
          color: colors.normalGrey,
          borderRadius: '2px',
          '&:hover': { backgroundColor: colors.darkGrey, color: colors.normalGrey },
        },
        containedCart: {
          fontFamily: font.fontOpenSanBold
        },
        cart: {
          minWidth: '41px',
          minHeight: '41px'
        },
        containedSizeSmall: { padding: 4, borderRadius: 0 },
        root: { padding: '13px 16px 14px', minWidth: 0 },
        outlined: { padding: '13px 16px 14px' },
      },
      variants: [
        {
          props: { variant: 'cart' },
          style: {
            color: colors.white,
            height: 52,
            backgroundColor: palette.primary.main,
            '&:hover': {
              backgroundColor: palette.primary.dark,
            },
          },
        },
        {
          props: { variant: 'cart', size: 'small' },
          style: {
            color: colors.white,
            width: 36,
            height: 36,
            padding: 0,
            backgroundColor: palette.primary.main,
            '&:hover': {
              backgroundColor: palette.primary.dark,
            },
          },
        },
        {
          props: { variant: 'contained', color: 'cart' },
          style: {
            color: colors.white,
          },
        },
        {
          props: { variant: 'disabled', color: 'cart' },
          style: {
            backgroundColor: 'rgba(0, 0, 0, 0.12)',
            pointerEvents: 'all !important',
          },
        },
      ],
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: 'xl',
      },
    },
    MuiLink: { defaultProps: { underline: 'none', color: 'inherit' } },
    MuiTextField: { defaultProps: { fullWidth: true, variant: 'filled', margin: 'normal' } },
    MuiCheckbox: { defaultProps: { color: 'primary' } },
    MuiRadio: { defaultProps: { color: 'primary' } },
    MuiTabs: { defaultProps: { indicatorColor: 'primary' } },
    MuiAppBar: {
      styleOverrides: { root: { boxShadow: 'none' }, colorDefault: { color: colors.black, backgroundColor: colors.white } },
    },
    MuiFilledInput: { styleOverrides: { root: { backgroundColor: colors.white, borderRadius: '0 !important' } } },
    MuiOutlinedInput: {
      styleOverrides: {
        root: { backgroundColor: colors.whiteGrey, borderRadius: 4, border: 'none', '&$focused': { background: colors.white } },
        notchedOutline: { border: 'none' },
      },
    },
    MuiTab: { styleOverrides: { root: { padding: 6, fontWeight: 800, '&$selected': { fontWeight: 800 } } } },
    MuiDrawer: { styleOverrides: { root: { zIndex: '99999 !important' }, paper: { minWidth: 280 } } },
    MuiPopover: { styleOverrides: { root: { zIndex: '99999 !important' } } },
    MuiAutocomplete: { styleOverrides: { popper: { zIndex: 99999 } } },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: 'transparent',
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          '.Mui-selected &': {
            fontWeight: 700,
            color: palette.primary.dark,
          },
        },
      },
    },
  },
  palette,
}

export default theme
