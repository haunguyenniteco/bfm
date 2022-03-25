import { FormattedMessage } from 'react-intl'
import { getNutrientName } from '@lib/helpers' // calculateNutrientRI
import { UNIT_SYMBOL } from '@lib/constants'

import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import messages from './messages'
import { MuiTable } from './elements'

const getQuantityContainedString = quantityContained =>
  quantityContained
    .map(quantity => `${parseFloat(quantity.value) || 0}${UNIT_SYMBOL[quantity.measurementUnitCode]}`)
    .join('/')

const NutritionTable = ({ vitamins, items, locale, servingSizeDescription, index, nutrientBasisQuantity }) => (
  <Box>
    <MuiTable>
      {servingSizeDescription && (
        <TableHead>
          <TableRow>
            <TableCell>
              {index === 0 && <FormattedMessage {...messages[vitamins ? 'vitaminInfo' : 'typical']} />}
            </TableCell>
            <TableCell>
              <FormattedMessage
                {...messages.nutrientBasis}
                values={{
                  quantity: nutrientBasisQuantity.value || 100,
                  unit: UNIT_SYMBOL[nutrientBasisQuantity.measurementUnitCode] || 'g',
                }}
              />
            </TableCell>
          </TableRow>
        </TableHead>
      )}
      <TableBody component={Paper} elevation={0}>
        {items
          .filter(item => item.value)
          .map(item => (
            <>
              <TableRow key={item.code}>
                <TableCell>{getNutrientName(locale, item)}</TableCell>
                <TableCell>{getQuantityContainedString(item.value.quantityContained)}</TableCell>
              </TableRow>
              {item.subCodes
                ?.filter(subItem => subItem.value)
                .map(subItem => (
                  <TableRow key={subItem.code}>
                    <TableCell>{getNutrientName(locale, subItem)}</TableCell>
                    <TableCell>{getQuantityContainedString(subItem.value.quantityContained)}</TableCell>
                  </TableRow>
                ))}
            </>
          ))}
      </TableBody>
    </MuiTable>
  </Box>
)

export default NutritionTable
