import { Container } from '@components/ui'
import { Loading } from '@components/ui/index'
import useContent from '@hooks/useContent'
import { Custom404 } from '@components/common'

function CatchAll({ router }) {
  const { query } = router
  const { content, loading, error } = useContent()

  if (loading) return <Loading title="" />

  if (error) console.error('Error', error)

  if (!content) {
    return <Custom404 />
  }
  return (
    <Container>
      {content}
      <pre>{JSON.stringify(query)}</pre>
    </Container>
  )
}

CatchAll.propTypes = {}

export default CatchAll
