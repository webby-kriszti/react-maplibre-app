import { Station } from 'src/shared/types'
import { BaseDataSource } from './BaseDataSource'
import { useLiveStationStore } from '@renderer/store/weather-stores/liveStataionStore'
import { liveStationService } from '@renderer/store/weather-stores/liveStationService'

export class LiveStationDataSource extends BaseDataSource<Station> {
  constructor() {
    super()
  }
  protected getStations(): Station[] {
    return useLiveStationStore.getState().stations
  }

  protected doSubscribeToStations(cb: (value: Station[] | undefined) => void): () => void {
    return useLiveStationStore.subscribe((s) => s.stations, cb)
  }
  protected getSelectedStation(): Station | null {
    return useLiveStationStore.getState().selectedStation
  }
  protected doSubscribeToSelectedStation(cb: (value: Station | null) => void): () => void {
    return useLiveStationStore.subscribe((s) => s.selectedStation, cb)
  }
  protected doSelectStation(station: Station): void {
    liveStationService.selectStation(station)
  }
}
