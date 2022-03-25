import Link from 'next/link'
import Box from '@mui/material/Box'
import useAppState from '@hooks/useAppState'
import { Container } from '@components/ui'
import { routeCategorySelect } from '@lib/helpers'

import Breadcrumbs from '@components/ui/Breadcrumbs/index'
import Typography from '@mui/material/Typography'
import MaterialLink from '@mui/material/Link'
import { RightIcon } from './elements'
import messages from './messages'

const BreadcrumbLink = ({ title, href, onClick }) => (
  <Box alignItems="center" display="flex">
    {onClick ? (
      <MaterialLink fontSize={2} onClick={onClick}>
        {title}
      </MaterialLink>
    ) : (
      <Link href={href} passHref>
        <MaterialLink fontSize={2}>{title}</MaterialLink>
      </Link>
    )}
    <RightIcon />
  </Box>
)

function ProductBreadcrumb({ name, categories, locale }) {
  const { intl } = useAppState()
  const sortedCategories = [...categories].sort((item1, item2) => item1.level - item2.level)
  const parentCategory = sortedCategories[sortedCategories.length - 1]

  return (
    <>
      <Container>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            background: '#fff',
            paddingLeft: '30px',
            paddingRight: '30px',
            height: '60px',
          }}
        >
          <Breadcrumbs>
            <MaterialLink color="primary" href="/" sx={{ textDecoration: 'underline' }}>
              {intl.formatMessage(messages.home)}
            </MaterialLink>
            {parentCategory && (
              <MaterialLink
                color="primary"
                sx={{ textDecoration: 'underline', cursor: 'pointer' }}
                onClick={() => routeCategorySelect(parentCategory, locale)}
              >
                {parentCategory.name[locale]}
              </MaterialLink>
            )}
            <Typography color="textPrimary">{name[locale]}</Typography>
          </Breadcrumbs>
        </Box>
      </Container>
    </>
  )
}

ProductBreadcrumb.propTypes = {}

export default ProductBreadcrumb
