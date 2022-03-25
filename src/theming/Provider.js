import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import defaultTheme from './defaultTheme'
import brandTheme from './brandTheme'

const themeObject = process.env.BRAND_THEME === 'true' ? brandTheme : defaultTheme

export const theme = createTheme(themeObject)

const Provider = ({ children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </ThemeProvider>
)

export default Provider
