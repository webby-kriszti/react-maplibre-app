import { Station, StationMeasurement } from 'src/shared/types'
import { useLiveStationStore } from './liveStataionStore'

export const liveStationService = {
  addStation: (station: Station) => {
    const { actions } = useLiveStationStore.getState()
    actions.addStation(station)
  },
  addMeasurement: (stationId: string, measurement: StationMeasurement) => {
    const { actions } = useLiveStationStore.getState()
    actions.addMeasurement(stationId, measurement)
  },
  selectStation: (station: Station) => {
    const { actions } = useLiveStationStore.getState()
    actions.selectStation(station)
  }
}
