import { ReactElement } from 'react'
import { Station } from 'src/shared/types'

type BaseProp = {
  station: Station
}
type CompactProp = BaseProp & {
  mode: 'compact'
}
type TooltipInfo = {
  title: string
  topic: string
}
type DetailedProp = BaseProp & {
  mode: 'detailed'
  tooltipInfo: TooltipInfo
}
type StationDataLabelProps = CompactProp | DetailedProp
export const StationDataLabel = (props: StationDataLabelProps): ReactElement => {
  const { mode, station } = props
  if (mode === 'compact') {
    return (
      <div>
        <p>name: {station.name}</p>
        <p>{`Coordinates: ${station.coordinates[0]}, ${station.coordinates[1]}`}</p>
      </div>
    )
  } else {
    const { tooltipInfo } = props
    const handleClick = (): void => {
      console.log(`opening help for topic: ${tooltipInfo.topic}`)
    }
    return (
      <div>
        <p>name: {station.name}</p>
        <p>{`Coordinates: ${station.coordinates[0]}, ${station.coordinates[1]}`}</p>
        <div onClick={handleClick} title={tooltipInfo.title}>
          <p>🪲</p>
        </div>
      </div>
    )
  }
}
