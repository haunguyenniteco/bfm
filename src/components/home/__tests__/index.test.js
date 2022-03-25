import { act } from 'react-test-renderer'
import { render, screen } from 'test-utils'
import Home from '../index'

const CONTENT = 'Order your groceries online'

jest.mock('@hooks/useContent', () =>
  jest.fn(() => ({
    content: CONTENT,
  })),
)
jest.mock('@lib/persist', () => ({
  getSkipOnboarding: () => true,
}))

jest.mock('@hooks/useAppState', () =>
  jest.fn(() => ({
    intl: {
      formatMessage: ({ defaultMessage }) => defaultMessage,
    },
  })),
)

jest.mock('@components/common/AppDataProvider/Onboarding', () => () => {
  const OnboardingMock = 'OnboardingMock'
  return <OnboardingMock />
})

describe('<Home />', () => {
  it('render', async () => {
    act(() => {
      render(<Home />)
    })
    const content = await screen.findByText(CONTENT)
    expect(content).toBeInTheDocument()
  })
})
