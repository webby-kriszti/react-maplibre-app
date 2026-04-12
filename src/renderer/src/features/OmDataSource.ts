import { Station } from 'src/shared/types'
import { BaseDataSource } from './BaseDataSource'
import { useOmStore } from '@renderer/store/weather-stores/omStore'

export class OmDataSource extends BaseDataSource<Station> {
  constructor() {
    super()
  }
  protected getStations(): Station[] {
    return useOmStore.getState().stations
  }
  protected doSubscribeToStations(cb: (value: Station[] | undefined) => void): () => void {
    return useOmStore.subscribe((s) => s.stations, cb)
  }
  protected doSubscribeToSelectedStation(cb: (value: Station | null) => void): () => void {
    return useOmStore.subscribe((s) => s.selectedStation, cb)
  }
  protected getSelectedStation(): Station | null {
    return useOmStore.getState().selectedStation
  }
  protected doSelectStation(station: Station): void {
    useOmStore.getState().actions.selectStation(station)
  }
}
