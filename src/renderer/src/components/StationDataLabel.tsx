import { Station } from 'src/shared/types'

type BaseProp = {
  station: Station
}
type CompactProp = BaseProp & {
  mode: 'compact'
}
type DetailedProp = BaseProp & {
  mode: 'detailed'
  tooltipInfo: { title: string; topic: string }
}
type StationDataLabelProps = CompactProp | DetailedProp
