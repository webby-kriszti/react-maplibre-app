import { Station, StationMeasurement } from 'src/shared/types'
import { useMeteoHungaryStore } from './weather-stores/meteoHungaryStore'

export const meteoHungaryService = {
  addStation: (station: Station) => {
    const { actions } = useMeteoHungaryStore.getState()
    actions.addStation(station)
  },
  addMeasurement: (stationId: string, measurement: StationMeasurement) => {
    const { actions } = useMeteoHungaryStore.getState()
    actions.addMeasurement(stationId, measurement)
  },
  selectStation: (station: Station) => {
    const { actions } = useMeteoHungaryStore.getState()
    actions.selectStation(station)
  }
}
