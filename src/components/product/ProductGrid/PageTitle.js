import { FormattedMessage } from 'react-intl'
import { useRouter } from 'next/router'
import useCategories from '@hooks/useCategories'
import useChangeLanguage from '@hooks/useChangeLanguage'
import Typography from '@mui/material/Typography'
import messages from '../messages'
import { PageTitleWrapper } from './elements'

const PageTitle = () => {
  const { getCategoryById } = useCategories()
  const { locale } = useChangeLanguage()

  const {
    query: { categoryId },
  } = useRouter()

  const activeCategory = getCategoryById(categoryId)

  if (activeCategory) {
    return (
      <PageTitleWrapper py="14px">
        <Typography fontWeight="bold">{activeCategory.name[locale]}</Typography>
      </PageTitleWrapper>
    )
  }

  return (
    <PageTitleWrapper py="14px">
      <Typography fontWeight="bold" lineHeight={1.4}>
        <FormattedMessage {...messages.allProductsLabel} />
      </Typography>
    </PageTitleWrapper>
  )
}

export default PageTitle
