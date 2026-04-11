
import { Subscriptor } from './Subscriptors'

export abstract class BaseDataSource<T> {
  private _stationsSub: Subscriptor<T[]> | null = null
  private _selectedSub: Subscriptor<T | null> | null = null
  protected abstract getStations(): T[]
  protected abstract doSubscribeToStations(cb: (value: T[] | undefined) => void): () => void
  protected abstract doSubscribeToSelectedStation(cb: (value: T | null) => void): () => void
  protected abstract getSelectedStation(): T | null
  protected abstract doSelectStation(station: T): void

  private get stationsSub(): Subscriptor<T[]> {
    if (!this._stationsSub) {
      this._stationsSub = new Subscriptor<T[]>(
        () => this.getStations(),
        (cb) => this.doSubscribeToStations(cb),
        (a, b) => a === b
      )
    }
    return this._stationsSub
  }
  private get selectedSub(): Subscriptor<T | null> {
    if (!this._selectedSub) {
      this._selectedSub = new Subscriptor<T | null>(
        () => this.getSelectedStation(),
        (cb) => this.doSubscribeToSelectedStation(cb),
        (a, b) => a === b
      )
    }
    return this._selectedSub
  }
  public get items(): T[] | undefined {
    return this.stationsSub.value
  }
  public get selectedItem(): T | null {
    return this.selectedSub.value ?? null
  }
  public subscribeToStations(cb: (value: T[] | undefined) => void): void {
    this.stationsSub.subscribe(cb)
  }

  public subscribeToSelected(cb: (value: T | null) => void): void {
    this.selectedSub.subscribe((value) => cb(value ?? null))
  }
  public selectStation(station: T): void {
    this.doSelectStation(station)
  }
  public destroy(): void {
    this._stationsSub?.destroy()
    this._selectedSub?.destroy()
  }
}
