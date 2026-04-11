import { Station } from 'src/shared/types'
import { BaseDataSource } from './BaseDataSource'
import { useRecordedStore } from '@renderer/store/weather-stores/recordedStore'
import { recordedStationService } from '@renderer/store/recordedStationService'

export class StaticStationDataSource extends BaseDataSource<Station> {
  constructor() {
    super()
  }
  protected getStations(): Station[] {
    return useRecordedStore.getState().stations
  }
  protected doSubscribeToStations(cb: (value: Station[] | undefined) => void): () => void {
    return useRecordedStore.subscribe((s) => s.stations, cb)
  }
  protected getSelectedStation(): Station | null {
    return useRecordedStore.getState().selectedStation
  }
  protected doSubscribeToSelectedStation(cb: (value: Station | null) => void): () => void {
    return useRecordedStore.subscribe((s) => s.selectedStation, cb)
  }
  protected doSelectStation(station: Station): void {
    recordedStationService.selectStation(station)
  }
}
