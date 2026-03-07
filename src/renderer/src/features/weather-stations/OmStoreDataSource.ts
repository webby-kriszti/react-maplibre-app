import { Station } from 'src/shared/types'
import { BaseDataSource } from '../BaseDataSource'
import { useOmStore } from '@renderer/store/weather-stores/omStore'

export class OmStoreDataSource extends BaseDataSource<Station> {
  constructor() {
    super()
  }
  protected getDevices(): Station[] {
    return useOmStore.getState().stations
  }
  protected subscribeToStore(cb: (value: Station[] | undefined) => void): () => void {
    return useOmStore.subscribe((s) => s.stations, cb)
  }
}
