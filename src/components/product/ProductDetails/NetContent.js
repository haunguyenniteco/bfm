import { UnitMeasurements } from '@components/common'
import Measurement from './Measurement'

const NetContent = ({ netContent }) => {
  /* eslint-disable eqeqeq */
  if (netContent == undefined || netContent.length === 0) return null

  const [{ value, measurementUnitCode }] = netContent
  return (
    <Measurement>
      {value}
      <UnitMeasurements unit={measurementUnitCode} />
    </Measurement>
  )
}

export default NetContent
