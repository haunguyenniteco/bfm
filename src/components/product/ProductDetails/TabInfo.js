import Box from '@mui/material/Box'
import NutritionInfo from './NutritionInfo'

const TabInfo = ({ nutrition, locale }) => {
  return (
    <Box px="15px">
      <NutritionInfo nutrition={nutrition} locale={locale} />
    </Box>
  )
}

export default TabInfo
