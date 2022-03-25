import { Container } from '@components/ui'
import { Loading } from '@components/ui/index'
import { useContentByPath } from '@hooks/useContent'
import Typography from '@components/ui/Typography/index'
import { FormattedMessage } from 'react-intl'
import messages from './message'

const Custom404 = () => {
  const { content, loading, error } = useContentByPath('/404')

  if (loading) return <Loading title="" />

  if (error) console.error('Error', error)

  if (content) {
    return <Container>{content}</Container>
  }
  return (
    <Container>
      <Typography fontSize={10}>
        <FormattedMessage {...messages.pageNotFound} />
      </Typography>
    </Container>
  )
}

export default Custom404
