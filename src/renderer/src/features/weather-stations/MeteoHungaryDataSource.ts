import { Station } from 'src/shared/types'
import { BaseDataSource } from '../BaseDataSource'
import { useMeteoHungaryStore } from '@renderer/store/weather-stores/meteoHungaryStore'

export class MeteoHungaryDataSource extends BaseDataSource<Station> {
  constructor() {
    super()
  }
  protected getDevices(): Station[] {
    return useMeteoHungaryStore.getState().stations
  }
  protected subscribeToStore(cb: (value: Station[] | undefined) => void): () => void {
    return useMeteoHungaryStore.subscribe((s) => s.stations, cb)
  }
}
