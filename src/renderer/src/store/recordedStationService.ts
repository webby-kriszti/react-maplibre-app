import { Station } from 'src/shared/types'
import { useRecordedStore } from './weather-stores/recordedStore'

export const recordedStationService = {
  selectStation: (station: Station) => {
    const { actions } = useRecordedStore.getState()
    actions.selectStation(station)
  }
}
