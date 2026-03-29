import { Station } from 'src/shared/types'
import { BaseDataSource } from './BaseDataSource'

export class StaticStationDataSource extends BaseDataSource<Station> {
  constructor(private readonly stations: Station[]) {
    super()
  }
  protected getStations(): Station[] {
    return this.stations
  }
  protected doSubscribeToStations(): () => void {
    return () => {}
  }
  protected getSelectedStation(): Station | null {
    return this.stations[0]
  }
  protected doSubscribeToSelectedStation(): () => void {
    return () => {}
  }
}
