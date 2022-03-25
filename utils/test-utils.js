// eslint-disable-next-line
import { render } from '@testing-library/react'
import { withApollo } from 'src/lib/apollo/index'

const AllTheProviders = ({ children }) => {
  return <div>{children}</div>
}

const AllTheProvidersWithApollo = withApollo({ ssr: false })(AllTheProviders)

const customRender = (ui, options) => render(ui, { wrapper: AllTheProvidersWithApollo, ...options })

// re-export everything
// eslint-disable-next-line
export * from '@testing-library/react'

// override render method
export { customRender as render }
