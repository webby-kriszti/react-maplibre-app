import { Mappable } from 'src/shared/types'
import { Subscriptor } from './Subscriptors'

export abstract class BaseDataSource<T extends Mappable> {
  private subscriptor: Subscriptor<T[]>
  protected abstract getDevices(): T[]
  protected abstract subscribeToStore(cb: (value: T[] | undefined) => void): () => void
  constructor() {
    this.subscriptor = new Subscriptor<T[]>(
      () => this.getDevices(),
      (cb) => this.subscribeToStore(cb),
      () => false
    )
  }
  public get items(): T[] | undefined {
    return this.subscriptor.value
  }
  public subscribeToDevices(callback: (value: T[] | undefined) => void): void {
    this.subscriptor.subscribe(callback)
  }

  public destroy(): void {
    this.subscriptor.destroy()
  }
}
