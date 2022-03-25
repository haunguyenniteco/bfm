import { NextSeo } from 'next-seo'
import useAppState from '@hooks/useAppState'
import { Loading } from '@components/ui/index'
import ComponentError from '@components/common/Error/ComponentError'
import Box from '@mui/material/Box'
import useContent from '@hooks/useContent'
import Onboarding from '@components/common/AppDataProvider/Onboarding'
import messages from './messages'

const Home = () => {
  const { intl } = useAppState()
  const { loading, error, content } = useContent()

  if (loading) return <Loading title="" />
  if (error) return <ComponentError />

  return (
    <Box mb="100px">
      <NextSeo title={intl.formatMessage(messages.pageTitle)} />
      {content}
      <Onboarding />
    </Box>
  )
}

export default Home
