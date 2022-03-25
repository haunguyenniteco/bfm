import { AppContextProvider } from '@components/common/AppContext/index'
import { render, screen } from '@testing-library/react'
import { LanguageProvider } from 'src/components/common/index'
import ThemeProvider from '@theming/Provider'
import Profile from '../index'

const mockRouter = {
  route: '/',
  pathname: '',
  query: '',
  asPath: '',
  events: {
    on: () => true,
    off: () => true,
  },
  push: jest.fn(),
}
jest.mock('next/router', () => ({
  useRouter: () => mockRouter,
}))

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    idpProfileEdit: '#',
    idpPasswordReset: '#',
  },
}))

const mockUserDetails = {
  data: {},
  loading: null,
  error: null,
  refetch: jest.fn(),
}

jest.mock('@graphql-sdk', () => ({
  useUserDetails: () => mockUserDetails,
}))

const TestProviders = ({ children }) => (
  <LanguageProvider
    localeData={{
      locale: 'en',
      messages: {},
    }}
  >
    <ThemeProvider>
      <AppContextProvider
        value={{
          intl: {
            formatMessage: ({ defaultMessage }) => defaultMessage,
          },
        }}
      >
        {children}
      </AppContextProvider>
    </ThemeProvider>
  </LanguageProvider>
)

const testRender = (children, props) => render(<TestProviders {...props}>{children}</TestProviders>)

const currentCustomer = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'test@test.com',
}

describe('<Profile />', () => {
  it('error', async () => {
    mockUserDetails.error = true
    mockUserDetails.loading = false
    testRender(<Profile />)
    expect(screen.getByTestId('error')).toBeInTheDocument()
  })

  it('loading', async () => {
    mockUserDetails.error = false
    mockUserDetails.loading = true
    testRender(<Profile />)
    expect(screen.getByTestId('loading')).toBeInTheDocument()
  })

  // it('signed out', () => {
  //   testRender(<Profile />)
  //   expect(screen.getByTestId('not-signed-in')).toBeInTheDocument()
  // })
  it('signed in', () => {
    mockUserDetails.loading = false
    mockUserDetails.error = false
    mockUserDetails.data = { currentCustomer }
    testRender(<Profile />)
    expect(screen.getByText(currentCustomer.firstName, { exact: false })).toBeInTheDocument()
    expect(screen.getByText(currentCustomer.lastName, { exact: false })).toBeInTheDocument()
    expect(screen.getByText(currentCustomer.email)).toBeInTheDocument()
  })
  it('signed in with manage links', () => {
    mockUserDetails.loading = false
    mockUserDetails.error = false
    testRender(<Profile />)
    expect(screen.getByText('Manage account details')).toBeInTheDocument()
    expect(screen.getByText('Change password')).toBeInTheDocument()
  })
})
