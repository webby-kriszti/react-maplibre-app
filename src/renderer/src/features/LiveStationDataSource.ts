import { Station } from 'src/shared/types'
import { BaseDataSource } from './BaseDataSource'
import { useMeteoHungaryStore } from '@renderer/store/weather-stores/meteoHungaryStore'

export class LiveStationDataSource extends BaseDataSource<Station> {
  constructor() {
    super()
  }
  protected getStations(): Station[] {
    return useMeteoHungaryStore.getState().stations
  }

  protected doSubscribeToStations(cb: (value: Station[] | undefined) => void): () => void {
    return useMeteoHungaryStore.subscribe((s) => s.stations, cb)
  }
  protected getSelectedStation(): Station | null {
    return useMeteoHungaryStore.getState().selectedStation
  }
  protected doSubscribeToSelectedStation(cb: (value: Station | null) => void): () => void {
    return useMeteoHungaryStore.subscribe((s) => s.selectedStation, cb)
  }
}
