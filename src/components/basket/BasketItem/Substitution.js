import { useState, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import FormControlLabel from '@mui/material/FormControlLabel'
import { useBasket } from '@components/basket/BasketItem/context'
import Checkbox from '@mui/material/Checkbox'
import { Typography } from '@components/ui'
import messages from '../messages'

const Substitution = ({ item }) => {
  const [checked, setChecked] = useState(item?.allowReplace || false)

  const {
    actions: { setItemSubstitution },
  } = useBasket()

  const handleChange = event => setChecked(event.target.checked)

  useEffect(() => {
    setItemSubstitution(item, checked)
  }, [item, checked])

  return (
    <FormControlLabel
      data-cy="check-substitution"
      control={<Checkbox name="allowSubstitution" checked={checked} onChange={handleChange} sx={{ color: 'black' }} />}
      label={
        <Typography fontSize={12}>
          <FormattedMessage {...messages.substitution} />
        </Typography>
      }
    />
  )
}

export default Substitution
